import React from 'react';
import SubjectCard from './SubjectCard.jsx';

export default function Dashboard() {
  const subjects = [
    { title: 'Biology', desc: 'Anatomy, cells, genetics, ecology', colorFrom: 'from-green-400', colorTo: 'to-green-600' },
    { title: 'Chemistry', desc: 'Atoms, bonds, reactions', colorFrom: 'from-blue-400', colorTo: 'to-indigo-600' },
    { title: 'Nursing', desc: 'Patient care, pharmacology basics', colorFrom: 'from-pink-400', colorTo: 'to-purple-600' }
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-sm opacity-80">Pick a subject to start learning</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((s) => <SubjectCard key={s.title} {...s} />)}
      </div>
    </div>
  );
}
