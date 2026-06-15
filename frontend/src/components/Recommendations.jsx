import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

export default function Recommendations({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-white">
        <TrendingUp className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> Resume Improvement Plan
      </h3>
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/50 transition-colors">
        <ul className="space-y-3">
          {suggestions.map((s, i) => (
            <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
