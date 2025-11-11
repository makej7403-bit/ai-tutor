import React from 'react';

export default function SubjectCard({ title, desc, color }) {
  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${color} shadow-lg transform hover:scale-105 transition`}>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm opacity-90">{desc}</p>
    </div>
  );
}
