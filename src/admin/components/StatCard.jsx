import React from 'react';

export default function StatCard({ icon: Icon, label, value, trend, trendUp, color = 'brandBlue' }) {
  const colorMap = {
    brandBlue: { bg: 'bg-brandBlue/5 dark:bg-brandBlue/10', text: 'text-brandBlue dark:text-brandSky', border: 'border-brandBlue/10 dark:border-brandBlue/20' },
    brandSky: { bg: 'bg-brandSky/5 dark:bg-brandSky/10', text: 'text-brandSky', border: 'border-brandSky/10 dark:border-brandSky/20' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-500/20' },
    amber: { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-500/20' },
    violet: { bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-100 dark:border-violet-500/20' },
    rose: { bg: 'bg-rose-50 dark:bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-500/20' },
  };

  const c = colorMap[color] || colorMap.brandBlue;

  return (
    <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:shadow-lg dark:hover:shadow-none hover:shadow-slate-100 transition-all duration-300 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center border ${c.border} group-hover:scale-110 transition-transform duration-300`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {trend && (
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${trendUp ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-headline font-black text-slate-800 dark:text-white leading-none">{value}</p>
      <p className="text-xs font-medium text-slate-400 dark:text-slate-550 mt-1.5 uppercase tracking-wider">{label}</p>
    </div>
  );
}
