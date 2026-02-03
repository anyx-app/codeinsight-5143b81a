import { ArrowUpRight, CheckCircle2, GitPullRequest, AlertCircle, Activity } from "lucide-react";
import StatCard from "../components/ui/StatCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero / Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 border border-white/10">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome back, Alex!
          </h1>
          <p className="text-slate-400 max-w-2xl">
            You have <span className="text-white font-medium">3 pending reviews</span> and the overall code quality score has improved by <span className="text-green-400 font-medium">+5%</span> this week.
          </p>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Repositories" 
          value="12" 
          trend="+2" 
          trendUp={true} 
          icon={Activity} 
        />
        <StatCard 
          title="Open PRs" 
          value="8" 
          trend="-3" 
          trendUp={true} 
          trendLabel="vs last week"
          icon={GitPullRequest} 
        />
        <StatCard 
          title="Code Quality" 
          value="94%" 
          trend="+1.2%" 
          trendUp={true} 
          icon={CheckCircle2} 
        />
        <StatCard 
          title="Critical Issues" 
          value="2" 
          trend="+1" 
          trendUp={false} 
          icon={AlertCircle} 
          alert={true}
        />
      </div>

      {/* Main Content Split: Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View all</button>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
             {[
               { title: "feat: implement user authentication", repo: "frontend-app", user: "Sarah J.", status: "Merged", time: "2h ago" },
               { title: "fix: navbar responsive layout", repo: "design-system", user: "Mike T.", status: "Review", time: "4h ago" },
               { title: "chore: update dependencies", repo: "backend-api", user: "Alex D.", status: "Pending", time: "5h ago" },
               { title: "docs: update API reference", repo: "docs", user: "Sarah J.", status: "Merged", time: "1d ago" },
             ].map((item, idx) => (
               <div key={idx} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group cursor-pointer">
                 <div className="flex items-center gap-4">
                   <div className={`h-2 w-2 rounded-full ${item.status === 'Merged' ? 'bg-purple-500' : item.status === 'Review' ? 'bg-yellow-500' : 'bg-slate-500'}`}></div>
                   <div>
                     <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{item.title}</p>
                     <p className="text-xs text-slate-500">{item.repo} • {item.user}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                        item.status === 'Merged' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 
                        item.status === 'Review' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 
                        'bg-slate-500/10 border-slate-500/20 text-slate-400'
                    }`}>
                        {item.status}
                    </span>
                    <span className="text-xs text-slate-600 min-w-[3rem] text-right">{item.time}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Side Panel: Action & Insights */}
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
                <button className="group relative flex items-center p-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-600/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="mr-4 p-2 bg-white/20 rounded-lg">
                        <GitPullRequest size={20} />
                    </div>
                    <div className="text-left">
                        <p className="font-semibold">Review PRs</p>
                        <p className="text-xs text-blue-100 opacity-80">3 waiting for you</p>
                    </div>
                    <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                </button>

                <button className="group relative flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
                    <div className="mr-4 p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                        <ShieldCheck size={20} />
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-slate-200">Quality Report</p>
                        <p className="text-xs text-slate-500">Generate analysis</p>
                    </div>
                </button>
            </div>

            <div className="mt-8 p-5 rounded-xl bg-gradient-to-br from-slate-900 to-[#0d1117] border border-white/10">
                <h3 className="text-sm font-semibold text-slate-300 mb-3">System Status</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">API Latency</span>
                        <span className="text-green-400">24ms</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full">
                        <div className="bg-green-500 h-1 rounded-full w-[95%]"></div>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-1">
                        <span className="text-slate-500">Worker Nodes</span>
                        <span className="text-blue-400">Active</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
