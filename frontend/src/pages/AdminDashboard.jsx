import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../services/api';
import { Users, FileText, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total_count: 0 });

  useEffect(() => {
    getAnalytics().then(data => setStats(data)).catch(err => console.error(err));
  }, []);

  const mockData = [
    { name: 'Mon', resumes: 12 },
    { name: 'Tue', resumes: 19 },
    { name: 'Wed', resumes: 15 },
    { name: 'Thu', resumes: 22 },
    { name: 'Fri', resumes: 30 },
    { name: 'Sat', resumes: 10 },
    { name: 'Sun', resumes: 8 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Resumes Analyzed</div>
            <div className="text-3xl font-bold text-slate-800">{stats.total_count}</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Active Users</div>
            <div className="text-3xl font-bold text-slate-800">124</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">System Uptime</div>
            <div className="text-3xl font-bold text-slate-800">99.9%</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-96">
        <h2 className="text-xl font-semibold mb-6">Weekly Activity</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
            <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '0.75rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
            <Bar dataKey="resumes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
