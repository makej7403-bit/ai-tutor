import React from "react";
import { Link } from "react-router-dom";

export default function Nursing(){
  return (
    <div className="grid gap-6">
      <div className="card">
        <h2 className="text-2xl font-semibold">Nursing Tutor</h2>
        <p className="text-sm text-gray-600">Study patient care, pharmacology, anatomy and clinical decision-making.</p>
        <div className="mt-4 flex gap-2">
          <Link to="/chat" className="px-3 py-2 bg-blue-600 text-white rounded">Ask AI (Nursing)</Link>
          <button className="px-3 py-2 border rounded">Case Studies</button>
        </div>
      </div>
      <div className="card">
        <h4>Clinical Disclaimer</h4>
        <p className="text-sm text-gray-600">This site offers study help only — it does not replace professional medical advice.</p>
      </div>
    </div>
  );
}
