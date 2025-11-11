import React, { useState } from "react";
import { askAI } from "../api";

export default function Chat() {
  const [subject, setSubject] = useState("Biology");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const data = await askAI({ subject, question });
      setAnswer(data.answer || "No response from AI.");
    } catch (err) {
      console.error(err);
      setAnswer("⚠️ Unable to connect to AI Tutor. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="card">
        <h3>Ask anything about <strong>{subject}</strong> — AI will answer instantly!</h3>
        <div style={{ margin: "8px 0" }}>
          <select value={subject} onChange={(e)=>setSubject(e.target.value)}>
            {["Biology","Chemistry","Physics","Mathematics","Nursing","English"].map(s=>(
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="Type your question..." />
        <div style={{ marginTop:10 }}>
          <button onClick={handleAsk} disabled={loading}>{loading? "Thinking..." : "Ask AI"}</button>
        </div>
      </div>

      <div className="card">
        <h4>AI Response:</h4>
        <div style={{ whiteSpace: "pre-wrap" }}>{answer}</div>
      </div>
    </div>
  );
}
