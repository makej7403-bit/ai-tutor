import React from 'react';

export default function SubjectCard({ title, desc, colorFrom='from-blue-400', colorTo='to-indigo-600' }) {
  const gradient = `${colorFrom} ${colorTo}`;
  return (
    <div className={`p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all`} style={{background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'}}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm opacity-80 mt-2">{desc}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="py-2 px-3 bg-white/10 rounded-md">Start Lessons</button>
        <button className="py-2 px-3 bg-white/10 rounded-md">Practice Quiz</button>
      </div>
    </div>
  );
}
