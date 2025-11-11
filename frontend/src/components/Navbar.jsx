import React from 'react';

export default function Navbar({ onSelectPage }) {
  return (
    <nav className="bg-white/10 backdrop-blur-md p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-cyan-300">FullTask AI Tutor</h1>
      <ul className="flex space-x-6 text-sm">
        <li onClick={() => onSelectPage('dashboard')} className="cursor-pointer hover:text-cyan-300">Dashboard</li>
        <li onClick={() => onSelectPage('chat')} className="cursor-pointer hover:text-cyan-300">AI Chat</li>
        <li className="cursor-pointer hover:text-cyan-300">About</li>
      </ul>
    </nav>
  );
}
