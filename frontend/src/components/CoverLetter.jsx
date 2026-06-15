import React from 'react';
import { FileText } from 'lucide-react';

export default function CoverLetter({ text }) {
  if (!text) return null;
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-white">
        <FileText className="w-5 h-5 text-blue-500 dark:text-blue-400" /> Auto-Generated Cover Letter
      </h3>
      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-serif leading-relaxed text-sm shadow-inner transition-colors">
        {text}
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 italic">* Make sure to replace placeholders like [Your Name] before sending.</p>
    </div>
  );
}
