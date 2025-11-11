import React, { useState, useEffect, useRef } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const synth = window.speechSynthesis;
  const endRef = useRef(null);

  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const scrollToEnd = () => endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToEnd, [chat]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      alert("Login failed!");
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    setChat([]);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { role: "user", content: message };
    setChat([...chat, userMsg]);
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://fulltask-ai-backend.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      const botMsg = { role: "assistant", content: data.reply };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      setChat((prev) => [...prev, { role: "assistant", content: "Error contacting AI." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white">
        <div className="text-center p-8 rounded-2xl bg-white/20 backdrop-blur-md shadow-xl">
          <h1 className="text-3xl font-bold mb-6">🔐 FullTask AI Tutor</h1>
          <p className="mb-4">Sign in with Google to start learning.</p>
          <button
            onClick={handleLogin}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-100"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="font-bold text-2xl text-blue-700">🧠 FullTask AI Tutor</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user.displayName}</span>
          <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full" />
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`max-w-2xl mx-auto p-4 rounded-xl shadow-md ${
              msg.role === "user" ? "bg-blue-500 text-white ml-auto" : "bg-white"
            }`}
          >
            <p className="text-lg">{msg.content}</p>
            {msg.role === "assistant" && (
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => speak(msg.content)}
                  className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  🔊 Read
                </button>
                <button
                  onClick={() => copyText(msg.content)}
                  className="text-sm bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                >
                  📋 Copy
                </button>
              </div>
            )}
          </div>
        ))}
        {loading && <p className="text-center text-gray-500">Thinking...</p>}
        <div ref={endRef}></div>
      </main>

      <footer className="p-4 bg-white flex gap-3 shadow-inner">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything about Biology, Chemistry, or Nursing..."
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-60"
        >
          ➤
        </button>
      </footer>
    </div>
  );
}
