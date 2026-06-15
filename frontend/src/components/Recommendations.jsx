import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

export default function Recommendations({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
        <TrendingUp className="w-5 h-5 text-emerald-500" /> Resume Improvement Plan
      </h3>
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
        <ul className="space-y-3">
          {suggestions.map((s, i) => (
            <li key={i} className="flex gap-3 text-slate-700">
              <Target className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
