import React, { useState, useRef } from 'react';
import { uploadResume, analyzeResume } from '../services/api';
import { Upload, FileText, Briefcase, ChevronRight, BarChart, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import CoverLetter from '../components/CoverLetter';
import InterviewPrep from '../components/InterviewPrep';
import Recommendations from '../components/Recommendations';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

export default function UserDashboard() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  const reportRef = useRef();

  const handleAnalyze = async () => {
    if (!file || !jd) {
      setError('Please upload a resume and paste a job description.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const uploadRes = await uploadResume(file);
      const text = uploadRes.resume_text;
      const analysis = await analyzeResume(text, jd);
      setResults(analysis);
      setActiveTab('overview');
    } catch (err) {
      setError('An error occurred during analysis.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const element = reportRef.current;
    const opt = {
      margin:       0.5,
      filename:     'ATS_Analysis_Report.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  // Format data for radar chart
  const radarData = results ? [
    { subject: 'Skills', A: results.skills_match, fullMark: 100 },
    { subject: 'Experience', A: results.experience_match, fullMark: 100 },
    { subject: 'Education', A: results.education_match, fullMark: 100 },
    { subject: 'Keywords', A: results.ats_score, fullMark: 100 },
  ] : [];

  return (
    <div className="p-6 max-w-7xl mx-auto h-full min-h-[calc(100vh-73px)]">
      <div className="grid lg:grid-cols-12 gap-8 h-full">
        {/* Left Column - Input */}
        <div className="lg:col-span-5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-white/20 dark:border-slate-700 flex flex-col gap-6 h-fit transition-colors duration-300">
          <div>
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-slate-800 dark:text-white"><Upload className="w-6 h-6 text-blue-500 dark:text-blue-400"/> Upload Resume</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Supported formats: PDF, DOCX</p>
          </div>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-8 text-center hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
            <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="resume-upload" />
            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
              <FileText className="w-12 h-12 text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors mb-4" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">{file ? file.name : 'Click to browse or drag and drop'}</span>
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-slate-800 dark:text-white"><Briefcase className="w-6 h-6 text-purple-500 dark:text-purple-400"/> Job Description</h2>
            <textarea 
              className="w-full h-48 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-colors"
              placeholder="Paste the job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            ></textarea>
          </div>

          {error && <div className="text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl text-sm font-medium border border-red-100 dark:border-red-800/50">{error}</div>}

          <button 
            onClick={handleAnalyze} 
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Scanning...
              </span>
            ) : <>Analyze Match <ChevronRight className="w-5 h-5"/></>}
          </button>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-7 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-white/20 dark:border-slate-700 flex flex-col overflow-hidden transition-colors duration-300">
          {results ? (
            <>
              <div className="bg-slate-50/80 dark:bg-slate-900/50 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {['overview', 'recommendations', 'cover_letter', 'interview'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)} 
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap capitalize ${activeTab === tab ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800'}`}
                    >
                      {tab.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <button onClick={handleDownload} className="ml-4 flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors whitespace-nowrap">
                  <Download className="w-4 h-4"/> Export PDF
                </button>
              </div>

              <div className="p-8 overflow-y-auto" ref={reportRef}>
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl border border-blue-100 dark:border-blue-800/50">
                      <div>
                        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-1">Overall Match Score</h2>
                        <p className="text-sm text-blue-600/80 dark:text-blue-400">Based on multi-factor ATS analysis</p>
                      </div>
                      <span className="text-5xl font-black text-blue-600 dark:text-blue-400 drop-shadow-sm">{results.ats_score}%</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#94a3b8" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                            <Radar name="Candidate" dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.5} />
                            <RechartsTooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Missing Keywords</h3>
                          <div className="flex flex-wrap gap-2">
                            {results.missing_skills?.length > 0 ? results.missing_skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium">{skill}</span>
                            )) : <span className="text-sm text-slate-500">None found!</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                        <h3 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-3 text-lg">Strengths</h3>
                        <ul className="space-y-2">
                          {results.strengths?.map((s, i) => (
                            <li key={i} className="flex gap-2 text-emerald-700 dark:text-emerald-300 text-sm">
                              <span className="text-emerald-500 mt-0.5">•</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-amber-50/50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                        <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-3 text-lg">Weaknesses</h3>
                        <ul className="space-y-2">
                          {results.weaknesses?.map((w, i) => (
                            <li key={i} className="flex gap-2 text-amber-700 dark:text-amber-300 text-sm">
                              <span className="text-amber-500 mt-0.5">•</span> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'recommendations' && <Recommendations suggestions={results.suggestions} />}
                {activeTab === 'cover_letter' && <CoverLetter text={results.cover_letter} />}
                {activeTab === 'interview' && <InterviewPrep questions={results.interview_questions} />}
              </div>
            </>
          ) : (
            <div className="p-8 h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 min-h-[500px]">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <BarChart className="w-10 h-10 text-slate-300 dark:text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">Ready to Analyze</h3>
              <p className="text-center max-w-sm leading-relaxed">Upload your resume and JD to generate your interactive Custom Report, Cover Letter, and Interview Guide.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
