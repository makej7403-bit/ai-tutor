import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ChatBot from "./components/ChatBot.jsx";
import Auth from "./components/Auth.jsx";

/*
 Top-level app: manages theme and routing between pages.
 Theme is persisted in localStorage.
*/

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("ft_theme") || "light");
  const [page, setPage] = useState("dashboard"); // dashboard | chat

  useEffect(() => {
    localStorage.setItem("ft_theme", theme);
    document.documentElement.classList.remove("theme-light", "theme-dark", "theme-colorful");
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className="min-h-screen app-bg">
      <Navbar theme={theme} setTheme={setTheme} setPage={setPage} />
      <div className="flex">
        <Sidebar setPage={setPage} />
        <main className="flex-1 p-6 max-h-screen overflow-auto">
          {page === "dashboard" && <Dashboard theme={theme} />}
          {page === "chat" && <ChatBot theme={theme} />}
        </main>
      </div>

      {/* Auth modal / component */}
      <Auth />
    </div>
  );
}
