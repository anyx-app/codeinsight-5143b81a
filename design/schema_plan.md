# Schema Plan - CodeInsight

## Overview
This schema is designed to support CodeInsight's core features: automated code quality checks, style guide enforcement, review tracking, and metrics dashboards.

## Tables

### 1. profiles
Extends Supabase `auth.users` to store application-specific user data.
- **id** (uuid, PK, FK -> auth.users.id): Unique user identifier.
- **email** (text): User email (cached for convenience).
- **full_name** (text): Display name.
- **avatar_url** (text): Profile picture.
- **created_at** (timestamptz): Creation timestamp.
- **updated_at** (timestamptz): Last update timestamp.

### 2. organizations
Groups users and repositories.
- **id** (uuid, PK): Unique organization ID.
- **name** (text): Organization name.
- **slug** (text, unique): URL-friendly identifier.
- **created_at** (timestamptz).

### 3. organization_members
Junction table for Users <-> Organizations.
- **organization_id** (uuid, PK, FK -> organizations.id).
- **user_id** (uuid, PK, FK -> profiles.id).
- **role** (text): 'owner', 'admin', 'member'.
- **created_at** (timestamptz).

### 4. repositories
Code repositories being tracked by CodeInsight.
- **id** (uuid, PK): Unique repo ID.
- **organization_id** (uuid, FK -> organizations.id).
- **name** (text): Repository name (e.g., "frontend-app").
- **provider** (text): 'github', 'gitlab', 'bitbucket'.
- **provider_repo_id** (text): External ID from provider.
- **default_branch** (text): Main branch name.
- **created_at** (timestamptz).

### 5. style_guides
Rulesets for automated enforcement.
- **id** (uuid, PK).
- **organization_id** (uuid, FK -> organizations.id).
- **name** (text): e.g., "Strict Typescript".
- **rules_config** (jsonb): The actual rules definition.
- **is_active** (boolean).

### 6. pull_requests
Tracks PRs synced from the provider.
- **id** (uuid, PK).
- **repository_id** (uuid, FK -> repositories.id).
- **author_id** (uuid, FK -> profiles.id, nullable): If the author is a platform user.
- **provider_pr_id** (text): External PR number/ID.
- **title** (text).
- **status** (text): 'open', 'closed', 'merged'.
- **created_at** (timestamptz).
- **merged_at** (timestamptz, nullable).

### 7. automated_checks
Results of automated quality checks run by CodeInsight.
- **id** (uuid, PK).
- **pull_request_id** (uuid, FK -> pull_requests.id).
- **status** (text): 'pending', 'passed', 'failed'.
- **report** (jsonb): Detailed output of the check.
- **score** (integer): Calculated quality score (0-100).
- **created_at** (timestamptz).

### 8. code_reviews
Tracks reviews performed (manual or automated suggestions).
- **id** (uuid, PK).
- **pull_request_id** (uuid, FK -> pull_requests.id).
- **reviewer_id** (uuid, FK -> profiles.id, nullable): Null if automated bot.
- **status** (text): 'approved', 'changes_requested', 'commented'.
- **comments_count** (integer).
- **submitted_at** (timestamptz).

## Relationships
- `organizations` have many `repositories`.
- `repositories` have many `pull_requests`.
- `pull_requests` have many `automated_checks` and `code_reviews`.
- `style_guides` belong to `organizations` (can be applied to multiple repos, logic to be defined in app).

## Security (RLS)
- Users can view data for `organizations` they are members of.
- `profiles` are publicly viewable or restricted to org members depending on privacy settings (default: auth users).
