import React, { useState, useRef } from 'react';
import { uploadResume, analyzeResume } from '../services/api';
import { Upload, FileText, Briefcase, ChevronRight, BarChart, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import CoverLetter from '../components/CoverLetter';
import InterviewPrep from '../components/InterviewPrep';
import Recommendations from '../components/Recommendations';

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

  return (
    <div className="grid lg:grid-cols-12 gap-8 h-full">
      <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6 h-fit">
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

      <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        {results ? (
          <>
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex gap-2 overflow-x-auto">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}>Overview</button>
                <button onClick={() => setActiveTab('recommendations')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'recommendations' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}>Improvement Plan</button>
                <button onClick={() => setActiveTab('cover_letter')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'cover_letter' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}>Cover Letter</button>
                <button onClick={() => setActiveTab('interview')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'interview' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-white hover:text-slate-700'}`}>Interview Prep</button>
              </div>
              <button onClick={handleDownload} className="ml-4 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap">
                <Download className="w-4 h-4"/> Export PDF
              </button>
            </div>

            <div className="p-8 overflow-y-auto" ref={reportRef}>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><BarChart className="w-6 h-6 text-blue-500"/> ATS Analysis Overview</h2>
                  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-lg font-medium text-slate-700">Overall Match Score</span>
                    <span className="text-4xl font-bold text-blue-600">{results.ats_score}%</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                     <div className="bg-indigo-50 p-4 rounded-xl">
                       <div className="text-indigo-600 text-sm font-semibold mb-1">Skills Match</div>
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
                    <h3 className="font-semibold text-slate-800 mb-2">Missing Keywords & Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.missing_skills?.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2 text-emerald-600">Resume Strengths</h3>
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
              )}
              
              {activeTab === 'recommendations' && <Recommendations suggestions={results.suggestions} />}
              {activeTab === 'cover_letter' && <CoverLetter text={results.cover_letter} />}
              {activeTab === 'interview' && <InterviewPrep questions={results.interview_questions} />}
            </div>
          </>
        ) : (
          <div className="p-8 h-full flex flex-col items-center justify-center text-slate-400 min-h-[400px]">
            <BarChart className="w-16 h-16 mb-4 opacity-20" />
            <p>Upload your resume and JD to generate your Custom Report, Cover Letter, and Interview Guide.</p>
          </div>
        )}
      </div>
    </div>
  );
}
