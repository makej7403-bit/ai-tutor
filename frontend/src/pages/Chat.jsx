import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { saveChat, loadChat, saveProgress } from "../firestore";
import { API_BASE } from "../config/api";
import { FaVolumeUp, FaMicrophone, FaCopy } from "react-icons/fa";

export default function Chat(){
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // load saved chat from Firestore
        loadChat(u.uid).then(saved => {
          if (saved && saved.length) setMessages(saved);
        }).catch(()=>{});
      } else {
        // load localStorage fallback
        try {
          const local = JSON.parse(localStorage.getItem("ft_chat") || "[]");
          setMessages(local);
        } catch { }
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // persist locally always
    localStorage.setItem("ft_chat", JSON.stringify(messages));
    // also persist to Firestore for signed-in users
    if (user) saveChat(user.uid, "default", messages).catch(()=>{});
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, user]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server error: ${res.status} ${txt.slice(0,200)}`);
      }

      const data = await res.json();
      const aiText = data.reply || data.answer || "No answer";
      const aiMsg = { role: "assistant", text: aiText, ts: Date.now() };
      setMessages(prev => [...prev, aiMsg]);

      // optionally update progress: crude example increment
      if (user) {
        // you can implement more intelligent progress updates (per subject, correctness, quizzes)
        saveProgress(user.uid, { lastInteraction: new Date().toISOString() }).catch(()=>{});
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", text: "Server error. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return alert("Speech not supported");
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    window.speechSynthesis.speak(u);
  };

  const copyText = async (t) => {
    await navigator.clipboard.writeText(t);
    // use small toast UI later — for now alert
    alert("Copied");
  };

  // voice input (basic)
  const voiceInput = async () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      return alert("Speech Recognition not supported");
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.onresult = (ev) => {
      const txt = ev.results[0][0].transcript;
      setInput(txt);
    };
    recog.onerror = (e) => alert("Voice error: " + e.error);
    recog.start();
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-3">AI Tutor Chat</h3>

      <div className="h-80 overflow-y-auto p-2 mb-3 border rounded" style={{background:'#f8fafc'}}>
        {messages.map((m,i) => (
          <div key={i} className={`mb-3 ${m.role==='user'?'text-right':'text-left'}`}>
            <div className={m.role==='user' ? 'inline-block bubble-user' : 'inline-block bubble-ai'}>
              <div className="whitespace-pre-wrap">{m.text}</div>
              {m.role === 'assistant' && (
                <div className="mt-2 flex gap-2 justify-end">
                  <button onClick={() => speak(m.text)} title="Read aloud" className="px-2 py-1 rounded bg-green-500 text-white"><FaVolumeUp /></button>
                  <button onClick={() => copyText(m.text)} title="Copy" className="px-2 py-1 rounded bg-gray-200"><FaCopy /></button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesRef}></div>
      </div>

      <div className="flex gap-2">
        <button onClick={voiceInput} title="Voice input" className="px-3 py-2 rounded bg-white/80"><FaMicrophone /></button>
        <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask about Biology, Chemistry, Nursing..." className="flex-1 p-3 rounded border" onKeyDown={(e)=> e.key==='Enter' && send()} />
        <button onClick={send} className="px-4 py-2 bg-sky-600 text-white rounded">{loading ? 'Thinking...' : 'Send'}</button>
      </div>
    </div>
  );
}
