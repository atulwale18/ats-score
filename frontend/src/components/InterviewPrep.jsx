import React from 'react';
import { MessageSquare, Lightbulb } from 'lucide-react';

export default function InterviewPrep({ questions }) {
  if (!questions || questions.length === 0) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
        <MessageSquare className="w-5 h-5 text-indigo-500" /> Interview Preparation
      </h3>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
            <div className="font-semibold text-slate-800 mb-2">Q: {q.question}</div>
            <div className="flex gap-2 text-sm text-indigo-700 bg-indigo-50 p-3 rounded-lg">
              <Lightbulb className="w-5 h-5 flex-shrink-0" />
              <span><strong>Pro Tip:</strong> {q.tip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
