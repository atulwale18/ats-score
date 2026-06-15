import React from 'react';
import { MessageSquare, Lightbulb } from 'lucide-react';

export default function InterviewPrep({ questions }) {
  if (!questions || questions.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-white">
        <MessageSquare className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Interview Preparation
      </h3>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Q: {q.question}</div>
            <div className="flex gap-2 text-sm text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100/50 dark:border-indigo-800/50">
              <Lightbulb className="w-5 h-5 flex-shrink-0 text-indigo-500" />
              <span><strong className="text-indigo-800 dark:text-indigo-200">Pro Tip:</strong> {q.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
