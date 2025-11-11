import React from "react";
import { Link } from "react-router-dom";

export default function Chemistry(){
  return (
    <div className="grid gap-6">
      <div className="card">
        <h2 className="text-2xl font-semibold">Chemistry Tutor</h2>
        <p className="text-sm text-gray-600">Learn reactions, stoichiometry, organic chemistry and lab safety.</p>
        <div className="mt-4 flex gap-2">
          <Link to="/chat" className="px-3 py-2 bg-red-600 text-white rounded">Ask AI (Chemistry)</Link>
          <button className="px-3 py-2 border rounded">Practice Quiz</button>
        </div>
      </div>
      <div className="card">
        <h4>Sample Topic: Chemical Bonding</h4>
        <p className="text-sm text-gray-600">Use AI to generate practice problems and step-by-step solutions.</p>
      </div>
    </div>
  );
}
