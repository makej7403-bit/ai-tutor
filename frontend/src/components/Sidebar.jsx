import React from 'react';

export default function Sidebar({ onSelectPage }) {
  return (
    <aside className="w-60 bg-white/5 p-4 space-y-4 hidden md:block">
      <button
        onClick={() => onSelectPage('dashboard')}
        className="w-full py-2 rounded bg-cyan-600 hover:bg-cyan-700 font-semibold"
      >
        Dashboard
      </button>
      <button
        onClick={() => onSelectPage('chat')}
        className="w-full py-2 rounded bg-purple-600 hover:bg-purple-700 font-semibold"
      >
        AI Chat
      </button>
      <div className="mt-8 text-gray-300 text-sm">
        <p>Subjects</p>
        <ul className="space-y-1 mt-2">
          <li>Biology</li>
          <li>Chemistry</li>
          <li>Nursing</li>
        </ul>
      </div>
    </aside>
  );
}
