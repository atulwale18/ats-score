import React, { useState } from 'react';
import { uploadResume, analyzeResume } from '../services/api';
import { Upload, FileText, Briefcase, ChevronRight, BarChart } from 'lucide-react';

export default function UserDashboard() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

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
    } catch (err) {
      setError('An error occurred during analysis.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 h-full">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><Upload className="w-6 h-6 text-blue-500"/> Upload Resume</h2>
          <p className="text-slate-500 text-sm">Supported formats: PDF, DOCX</p>
        </div>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
          <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="resume-upload" />
          <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center">
            <FileText className="w-10 h-10 text-slate-400 mb-3" />
            <span className="text-slate-600 font-medium">{file ? file.name : 'Click to browse or drag and drop'}</span>
          </label>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><Briefcase className="w-6 h-6 text-purple-500"/> Job Description</h2>
          <textarea 
            className="w-full h-48 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Paste the job description here..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          ></textarea>
        </div>

        {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

        <button 
          onClick={handleAnalyze} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : <>Analyze Match <ChevronRight className="w-5 h-5"/></>}
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><BarChart className="w-6 h-6 text-emerald-500"/> Analysis Results</h2>
        {results ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-lg font-medium text-slate-700">Overall ATS Score</span>
              <span className="text-4xl font-bold text-blue-600">{results.ats_score}%</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
               <div className="bg-indigo-50 p-4 rounded-xl">
                 <div className="text-indigo-600 text-sm font-semibold mb-1">Skills</div>
                 <div className="text-2xl font-bold text-indigo-900">{results.skills_match}%</div>
               </div>
               <div className="bg-purple-50 p-4 rounded-xl">
                 <div className="text-purple-600 text-sm font-semibold mb-1">Experience</div>
                 <div className="text-2xl font-bold text-purple-900">{results.experience_match}%</div>
               </div>
               <div className="bg-pink-50 p-4 rounded-xl">
                 <div className="text-pink-600 text-sm font-semibold mb-1">Education</div>
                 <div className="text-2xl font-bold text-pink-900">{results.education_match}%</div>
               </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {results.missing_skills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">{skill}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2 text-emerald-600">Strengths</h3>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  {results.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2 text-amber-600">Weaknesses</h3>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  {results.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[300px]">
            <BarChart className="w-16 h-16 mb-4 opacity-20" />
            <p>Upload your resume and JD to see the magic happen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
