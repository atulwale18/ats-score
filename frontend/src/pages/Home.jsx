import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-73px)] w-full relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 dark:bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto z-10 w-full py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-8 border border-blue-100 dark:border-blue-800 shadow-sm backdrop-blur-sm">
          <Sparkles className="w-4 h-4" /> Introducing ATS Scorer V2
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          Land your dream job with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Precision</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Instantly analyze your resume against any job description. Get tailored cover letters, actionable improvement plans, and custom interview questions—all in one premium platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
          <Link to="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group text-lg">
            Scan My Resume 
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/admin" className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center text-lg">
            Admin Portal
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full text-left">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-slate-700 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Laser-Focused Analysis</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Our advanced NLP engine dissects your resume against the JD to find critical missing skills and keywords.</p>
          </div>
          
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-slate-700 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Instant Cover Letters</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Stop staring at a blank page. Get a highly tailored, professional cover letter drafted in milliseconds.</p>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-3xl border border-white/20 dark:border-slate-700 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Interview Defense</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">We predict the exact questions recruiters will ask based on your resume's weaknesses, and tell you how to answer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
