import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  trendLabel?: string;
  icon: LucideIcon;
  alert?: boolean;
}

export default function StatCard({ title, value, trend, trendUp, trendLabel = "this week", icon: Icon, alert = false }: StatCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        alert 
        ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40' 
        : 'bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-sm'
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${alert ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
          <Icon size={20} />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-xs">
          <span className={`flex items-center font-medium ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {trend}
          </span>
          <span className="ml-2 text-slate-500">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
