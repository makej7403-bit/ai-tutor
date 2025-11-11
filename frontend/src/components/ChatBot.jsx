import React, { useEffect, useRef, useState } from "react";

export default function ChatBot({ theme }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ft_chat")) || []; } catch { return []; }
  });
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("ft_chat", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text) => {
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    window.speechSynthesis.speak(utter);
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || ""}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botText = data.reply || data.answer || "No response.";
      const botMsg = { role: "assistant", text: botText, ts: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", text: "Error: cannot reach server." }]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    // light UI feedback
    alert("Copied to clipboard");
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("ft_chat");
  };

  return (
    <div className="flex flex-col h-[75vh] rounded-xl p-4 card-bg shadow-inner">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">AI Tutor Chat</h3>
        <div className="flex gap-2">
          <button onClick={clearChat} className="px-3 py-1 rounded-md text-sm">Clear</button>
          <span className="text-xs opacity-60">{messages.length} messages</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 p-2">
        {messages.map((m,i) => (
          <div key={i} className={`max-w-3xl p-3 rounded-xl ${m.role === 'user' ? 'ml-auto bg-cyan-600 text-white' : 'bg-white/5 text-white'}`}>
            <div className="flex justify-between items-start gap-3">
              <div className="whitespace-pre-wrap">{m.text}</div>
              {m.role === 'assistant' && (
                <div className="flex flex-col gap-2">
                  <button onClick={() => speak(m.text)} title="Read aloud" className="text-sm px-2 py-1 rounded bg-green-500">🔊</button>
                  <button onClick={() => copyToClipboard(m.text)} title="Copy" className="text-sm px-2 py-1 rounded bg-gray-300 text-black">📋</button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about Anatomy, Pharmacology, Reactions, etc..."
          className="flex-1 p-3 rounded-lg border border-transparent focus:outline-none"
        />
        <button disabled={loading} onClick={send} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
