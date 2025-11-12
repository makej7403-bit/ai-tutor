import React from "react";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1>🧠 AI Tutor</h1>
      <p style={{ maxWidth: "600px" }}>
        Hello there 👋 This AI Tutor website was created by{" "}
        <b>Akin S. Sokpah from Liberia 🇱🇷</b>.
      </p>
      <p>Speak, Learn, and Grow!</p>
    </div>
  );
}
