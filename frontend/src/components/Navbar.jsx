import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(){
  const loc = useLocation();
  return (
    <header className="navbar shadow-sm p-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold text-sky-600">FullTask AI Tutor</Link>
          <nav className="hidden md:flex gap-3 text-sm text-gray-700">
            <Link to="/biology" className={loc.pathname.startsWith('/biology') ? 'font-semibold' : ''}>Biology</Link>
            <Link to="/chemistry" className={loc.pathname.startsWith('/chemistry') ? 'font-semibold' : ''}>Chemistry</Link>
            <Link to="/nursing" className={loc.pathname.startsWith('/nursing') ? 'font-semibold' : ''}>Nursing</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/chat" className="px-3 py-2 rounded-md bg-sky-600 text-white">AI Chat</Link>
          <Link to="/auth" className="px-3 py-2 rounded-md border">Login</Link>
        </div>
      </div>
    </header>
  );
}
