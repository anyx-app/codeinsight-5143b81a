import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  GitPullRequest, 
  BookOpen, 
  Settings, 
  ShieldCheck, 
  Code2 
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Repositories', href: '/repos', icon: Code2 },
  { name: 'Pull Requests', href: '/prs', icon: GitPullRequest },
  { name: 'Style Guides', href: '/style-guides', icon: BookOpen },
  { name: 'Code Quality', href: '/quality', icon: ShieldCheck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#161b22]/50 backdrop-blur-xl md:flex">
      <div className="flex h-16 items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
             <Code2 size={20} />
          </div>
          CodeInsight
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-500'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="rounded-lg bg-white/5 p-4 border border-white/10 backdrop-blur-sm">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pro Plan</h4>
            <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-slate-500">15/20 Repositories Used</p>
        </div>
      </div>
    </aside>
  );
}
