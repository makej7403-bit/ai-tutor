import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ theme, setTheme, setPage }) {
  const nextTheme = () => {
    const map = { light: "dark", dark: "colorful", colorful: "light" };
    setTheme(map[theme]);
  };

  return (
    <nav className="flex items-center justify-between p-4 nav-bg shadow-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold text-cyan-500">FullTask AI</div>
        <div className="text-sm opacity-80">Biology • Chemistry • Nursing</div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setPage('dashboard')} className="px-3 py-1 rounded-md hover:opacity-90">Dashboard</button>
        <button onClick={() => setPage('chat')} className="px-3 py-1 rounded-md hover:opacity-90">Chat</button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={nextTheme}
          className="px-3 py-2 rounded-lg button-glass"
          title="Switch theme (Light / Dark / Colorful)"
        >
          Theme: {theme}
        </motion.button>
      </div>
    </nav>
  );
}
