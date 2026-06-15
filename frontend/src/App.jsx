import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600 tracking-tight">ATS Scorer</div>
          <div className="flex gap-4">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">User Portal</Link>
            <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Admin Dashboard</Link>
          </div>
        </nav>
        <main className="flex-1 p-6 flex flex-col max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
