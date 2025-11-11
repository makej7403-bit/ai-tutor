import React from "react";
import { Link } from "react-router-dom";

/*
  Dashboard is a hub — this file also includes placeholders for
  progress, recommended lessons, quizzes, and links to features.
*/
export default function Dashboard(){
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="text-sm text-gray-600">Welcome back — select a subject to continue</div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold">Biology</h3>
          <p className="text-sm text-gray-600">Anatomy, Physiology & Genetics</p>
          <div className="mt-3 flex gap-2">
            <Link to="/biology" className="px-3 py-2 bg-green-600 text-white rounded">Open</Link>
            <button className="px-3 py-2 border rounded">Start Quiz</button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold">Chemistry</h3>
          <p className="text-sm text-gray-600">Reactions, Organic Chemistry</p>
          <div className="mt-3 flex gap-2">
            <Link to="/chemistry" className="px-3 py-2 bg-red-600 text-white rounded">Open</Link>
            <button className="px-3 py-2 border rounded">Start Quiz</button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold">Nursing</h3>
          <p className="text-sm text-gray-600">Patient Care & Pharmacology</p>
          <div className="mt-3 flex gap-2">
            <Link to="/nursing" className="px-3 py-2 bg-blue-600 text-white rounded">Open</Link>
            <button className="px-3 py-2 border rounded">Practice</button>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="font-semibold">Daily Goal</h4>
        <p className="text-sm text-gray-600">Complete 30 minutes of study — AI suggests a lesson.</p>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-2 bg-sky-600 text-white rounded">Start Suggested Lesson</button>
          <button className="px-3 py-2 border rounded">View Progress</button>
        </div>
      </div>
    </div>
  );
}
