import { Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0d1117]/80 backdrop-blur-md px-8 sticky top-0 z-20">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input 
                type="text" 
                placeholder="Search repositories, PRs, or rules..." 
                className="w-full rounded-md border border-white/10 bg-white/5 py-1.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-[#0d1117]"></span>
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-1"></div>
        
        <button className="flex items-center gap-3 p-1 pl-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">Alex Dev</p>
                <p className="text-xs text-slate-500">Engineering Lead</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white ring-2 ring-[#0d1117]">
                <User size={18} />
            </div>
        </button>
      </div>
    </header>
  );
}
