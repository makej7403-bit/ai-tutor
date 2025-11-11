// central place for backend URL
export const API_BASE = (import.meta.env.VITE_API_BASE) || "https://ai-tutor-e5m3.onrender.com";

export async function askAI({ subject, question }) {
  const res = await fetch(`${API_BASE}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, question })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function generateQuiz({ subject, topic, num = 5 }) {
  const res = await fetch(`${API_BASE}/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, topic, num })
  });
  if (!res.ok) throw new Error(`Quiz error: ${res.status}`);
  return res.json();
}
