import React from 'react';

export default function Sidebar({ setPage }) {
  return (
    <aside className="w-72 p-4 hidden lg:block">
      <div className="space-y-4">
        <div className="card-bg p-4 rounded-2xl shadow-lg">
          <h3 className="font-bold text-lg">Welcome</h3>
          <p className="text-sm opacity-80 mt-2">Choose a subject or jump to Chat.</p>
          <div className="mt-4 grid grid-cols-1 gap-2">
            <button onClick={()=>setPage('dashboard')} className="py-2 rounded-md bg-cyan-600 text-white">Open Dashboard</button>
            <button onClick={()=>setPage('chat')} className="py-2 rounded-md bg-purple-600 text-white">Open AI Chat</button>
          </div>
        </div>

        <div className="card-bg p-4 rounded-2xl shadow-lg">
          <h4 className="font-semibold mb-2">Subjects</h4>
          <ul className="space-y-2 text-sm">
            <li>Biology — Anatomy & Physiology</li>
            <li>Chemistry — Organic & Inorganic</li>
            <li>Nursing — Clinical basics</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
