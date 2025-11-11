import React, { useState } from "react";

export default function ChatBox({ subject }){
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  async function ask(){
    if(!q) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || ""}/api/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, question: q })
      });
      const data = await res.json();
      setAnswer(data.answer || data?.answer?.content || "No answer");
    } catch (err) {
      setAnswer("Error: " + (err.message || err));
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-3xl">
      <label className="block mb-2">Ask about {subject}</label>
      <textarea value={q} onChange={e=>setQ(e.target.value)} className="w-full p-2 border rounded" rows={4}/>
      <div className="flex gap-2 mt-2">
        <button onClick={ask} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? "Thinking..." : "Ask AI"}
        </button>
        <button onClick={()=>{setQ(""); setAnswer("");}} className="px-4 py-2 border rounded">Clear</button>
      </div>

      {answer && (
        <div className="mt-4 p-4 bg-white border rounded shadow-sm">
          <h4 className="font-semibold">Answer</h4>
          <div className="whitespace-pre-wrap mt-2">{answer}</div>
        </div>
      )}
    </div>
  );
}
