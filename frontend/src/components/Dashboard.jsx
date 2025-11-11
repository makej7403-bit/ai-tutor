import React from 'react';
import SubjectCard from './SubjectCard.jsx';

export default function Dashboard() {
  const subjects = [
    { title: 'Biology', desc: 'Explore anatomy, cells, and ecosystems.', color: 'from-green-500 to-green-700' },
    { title: 'Chemistry', desc: 'Learn reactions, atoms, and molecules.', color: 'from-blue-500 to-indigo-700' },
    { title: 'Nursing', desc: 'Master human care, anatomy, and health.', color: 'from-pink-500 to-purple-700' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {subjects.map((s, i) => (
        <SubjectCard key={i} {...s} />
      ))}
    </div>
  );
}
