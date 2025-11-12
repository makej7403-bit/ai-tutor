import React, { useState } from "react";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://ai-tutor-e5m3.onrender.com"; // ✅ Your Render backend

  async function askAI() {
    if (!question.trim()) return alert("Please enter a question!");
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (data.answer) {
        setAnswer(data.answer);
        speak(data.answer);
      } else {
        setAnswer("⚠️ Unable to get AI response. Try again.");
      }
    } catch (error) {
      console.error(error);
      setAnswer("⚠️ Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>🧠 FullTask AI Tutor</h1>
      <p style={{ fontSize: "1.1em" }}>Ask anything — AI will read the answer aloud!</p>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        style={{
          width: "80%",
          maxWidth: "400px",
          padding: "10px",
          marginTop: "15px",
          borderRadius: "10px",
          border: "none",
          fontSize: "1em",
        }}
      />
      <button
        onClick={askAI}
        disabled={loading}
        style={{
          marginTop: "15px",
          background: "#00c6ff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      <div
        style={{
          marginTop: "30px",
          background: "rgba(255,255,255,0.1)",
          padding: "15px",
          borderRadius: "10px",
          width: "80%",
          maxWidth: "600px",
        }}
      >
        <h3>AI Response:</h3>
        <p>{answer || "Waiting for your question..."}</p>
      </div>

      <footer style={{ marginTop: "50px", fontSize: "0.9em", opacity: 0.8 }}>
        © 2025 FullTask AI Tutor | Powered by <b>Akin S. Sokpah</b> |
        Backend:{" "}
        <a
          href="https://ai-tutor-e5m3.onrender.com"
          style={{ color: "#00c6ff", textDecoration: "none" }}
        >
          ai-tutor-e5m3.onrender.com
        </a>
      </footer>
    </div>
  );
}
