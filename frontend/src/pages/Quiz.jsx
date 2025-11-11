import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { saveProgress } from "../firestore";

export default function QuizPage() {
  const [subject, setSubject] = useState("Biology");
  const [numQ, setNumQ] = useState(5);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=> onAuthStateChanged(auth, u=> setUser(u)), []);

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/quiz`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ subject, num_questions: numQ, difficulty: "medium" })
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setQuiz(data.quiz || []);
      setAnswers({});
      setResult(null);
    } catch (e) {
      alert("Could not get quiz: " + e.message);
    } finally { setLoading(false); }
  };

  const submit = async () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      const selected = answers[idx];
      if (selected != null && Number(selected) === Number(q.answerIndex)) score++;
    });
    const percent = (score / quiz.length) * 100;
    setResult({ score, total: quiz.length, percent });

    // save to firestore progress if user logged in
    if (user) {
      const progress = { lastQuiz: { subject, score, total: quiz.length, date: new Date().toISOString() } };
      await saveProgress(user.uid, progress);
    }
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-3">AI Quiz Generator</h3>

      <div className="flex gap-2 mb-4">
        <select value={subject} onChange={(e)=>setSubject(e.target.value)} className="p-2 border rounded">
          <option>Biology</option>
          <option>Chemistry</option>
          <option>Nursing</option>
        </select>
        <input type="number" value={numQ} onChange={(e)=>setNumQ(e.target.value)} className="w-20 p-2 border rounded" />
        <button onClick={generateQuiz} className="px-3 py-2 bg-sky-600 text-white rounded">{loading ? '...' : 'Generate Quiz'}</button>
      </div>

      {quiz.length > 0 && (
        <div>
          {quiz.map((q, i) => (
            <div key={i} className="mb-4">
              <div className="font-semibold">{i+1}. {q.q}</div>
              <div className="mt-2 grid gap-2">
                {q.choices.map((c, j) => (
                  <label key={j} className="flex items-center gap-2">
                    <input type="radio" name={`q${i}`} checked={answers[i]==j} onChange={()=>setAnswers(prev=>({...prev,[i]: j}))} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <button onClick={submit} className="px-3 py-2 bg-green-600 text-white rounded">Submit Quiz</button>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 border rounded">
          <div>Score: {result.score}/{result.total}</div>
          <div>Percent: {Math.round(result.percent)}%</div>
        </div>
      )}
    </div>
  );
}
