import React, { useState } from "react";
import { generateQuiz } from "../api";

export default function Quiz(){
  const [subject, setSubject] = useState("Biology");
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  async function handleGenerate(){
    setLoading(true);
    setQuiz([]);
    setResult(null);
    try {
      const data = await generateQuiz({ subject, topic, num:5 });
      // if backend returned stringly JSON from model, try parse
      const parsed = typeof data.quiz === "string" ? JSON.parse(data.quiz) : data.quiz;
      setQuiz(parsed);
    } catch (err) {
      console.error(err);
      alert("Quiz generation failed.");
    } finally { setLoading(false); }
  }

  function submit(){
    let score=0;
    quiz.forEach((q,i)=>{
      if (Number(answers[i]) === Number(q.answerIndex)) score++;
    });
    setResult({score, total: quiz.length});
  }

  return (
    <div>
      <div className="card">
        <h3>AI Quiz Generator</h3>
        <div style={{display:"flex", gap:8}}>
          <select value={subject} onChange={e=>setSubject(e.target.value)}>{["Biology","Chemistry","Nursing"].map(s=><option key={s}>{s}</option>)}</select>
          <input placeholder="Topic (optional)" value={topic} onChange={e=>setTopic(e.target.value)} />
          <button onClick={handleGenerate} disabled={loading}>{loading? "..." : "Generate Quiz"}</button>
        </div>
      </div>

      {quiz && quiz.length>0 && (
        <div className="card">
          {quiz.map((q, i) => (
            <div key={i} style={{ marginBottom:10 }}>
              <div><strong>{i+1}. {q.q}</strong></div>
              <div style={{ marginTop:6 }}>
                {q.choices.map((c,j)=>(
                  <label key={j} style={{ display:"block" }}>
                    <input type="radio" name={`q${i}`} value={j} onChange={()=>setAnswers(a=>({...a,[i]:j}))} />
                    {" "}{c}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div>
            <button onClick={submit}>Submit Quiz</button>
            {result && <div style={{marginTop:8}}>Score: {result.score}/{result.total}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
