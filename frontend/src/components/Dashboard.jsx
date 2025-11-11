import React, { useState } from "react";
import { FaFlask, FaDna, FaStethoscope, FaRobot, FaVolumeUp } from "react-icons/fa";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("biology");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // 🧠 Call OpenAI API (replace `YOUR_API_KEY` with actual key or env var)
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a professional AI tutor specialized in ${activeTab} for nursing and science students. Provide accurate, clear, and educational explanations.`,
          },
          { role: "user", content: input },
        ],
      }),
    });

    const data = await res.json();
    const aiMessage = data.choices?.[0]?.message?.content || "Sorry, I couldn’t find an answer.";

    setMessages((prev) => [...prev, { sender: "ai", text: aiMessage }]);
  };

  const handleReadAloud = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const tabs = [
    { key: "biology", label: "🧬 Biology", icon: <FaDna /> },
    { key: "chemistry", label: "⚗️ Chemistry", icon: <FaFlask /> },
    { key: "nursing", label: "💉 Nursing", icon: <FaStethoscope /> },
    { key: "ai", label: "🤖 AI Tutor", icon: <FaRobot /> },
  ];

  return (
    <div className="dashboard">
      {/* 🌟 Top Navbar */}
      <div className="navbar">
        <h1>FullTask AI - Science & Nursing Hub</h1>
        <div className="menu">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`menu-btn ${activeTab === tab.key ? "active" : ""}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 💬 Chat Section */}
      <div className="chatbox">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.sender === "user" ? "user" : "ai"}`}
            >
              <p>{msg.text}</p>
              {msg.sender === "ai" && (
                <button
                  className="read-btn"
                  onClick={() => handleReadAloud(msg.text)}
                >
                  <FaVolumeUp />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder={`Ask anything about ${activeTab}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}
