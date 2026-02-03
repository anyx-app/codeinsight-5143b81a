SET search_path TO proj_d85e0b33;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. profiles
-- Extends Supabase auth.users to store application-specific user data.
CREATE TABLE profiles (
  id UUID PRIMARY KEY, -- References auth.users.id manually in application logic if needed, but for RLS we use user_id
  user_id UUID NOT NULL, -- The link to auth.users
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- 2. organizations
-- Groups users and repositories.
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- 3. organization_members
-- Junction table for Users <-> Organizations.
CREATE TABLE organization_members (
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (organization_id, user_id)
);

ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- 4. repositories
-- Code repositories being tracked by CodeInsight.
CREATE TABLE repositories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('github', 'gitlab', 'bitbucket')),
  provider_repo_id TEXT,
  default_branch TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE repositories ENABLE ROW LEVEL SECURITY;

-- 5. style_guides
-- Rulesets for automated enforcement.
CREATE TABLE style_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  rules_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE style_guides ENABLE ROW LEVEL SECURITY;

-- 6. pull_requests
-- Tracks PRs synced from the provider.
CREATE TABLE pull_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  repository_id UUID NOT NULL REFERENCES repositories(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Nullable if author is not a platform user
  provider_pr_id TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'closed', 'merged')),
  created_at TIMESTAMPTZ DEFAULT now(),
  merged_at TIMESTAMPTZ
);

ALTER TABLE pull_requests ENABLE ROW LEVEL SECURITY;

-- 7. automated_checks
-- Results of automated quality checks run by CodeInsight.
CREATE TABLE automated_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'passed', 'failed')),
  report JSONB DEFAULT '{}'::jsonb,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE automated_checks ENABLE ROW LEVEL SECURITY;

-- 8. code_reviews
-- Tracks reviews performed (manual or automated suggestions).
CREATE TABLE code_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Null if automated bot
  status TEXT NOT NULL CHECK (status IN ('approved', 'changes_requested', 'commented')),
  comments_count INTEGER DEFAULT 0,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE code_reviews ENABLE ROW LEVEL SECURITY;


-- POLICIES (Simplified for Init - can be refined later)

-- Organizations: Visible if you are a member
CREATE POLICY "Members can view organizations" ON organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_members.organization_id = organizations.id
      AND organization_members.user_id IN (
          SELECT id FROM profiles WHERE user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      )
    )
  );

-- Organization Members: Visible if you are a member of the same org
CREATE POLICY "Members can view other members" ON organization_members
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM organization_members om
      JOIN profiles p ON om.user_id = p.id
      WHERE p.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );
