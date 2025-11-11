import React, { useState } from "react";

export default function Notes() {
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");

  const summarize = async () => {
    setSummary("⏳ Generating summary...");
    const res = await fetch("https://ai-tutor-e5m3.onrender.com/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setSummary(data.summary || "⚠️ Unable to fetch summary.");
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg">📘 AI Notes Generator</h2>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic..."
        className="border p-2 rounded w-3/4 mt-2"
      />
      <button onClick={summarize} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded">
        Generate
      </button>
      <p className="mt-3">{summary}</p>
    </div>
  );
}
