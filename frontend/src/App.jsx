import Quiz from "./pages/Quiz";
// ... in Routes:
<Route path="/quiz" element={<Quiz />} />
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Biology from "./pages/Biology";
import Chemistry from "./pages/Chemistry";
import Nursing from "./pages/Nursing";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/biology" element={<Biology />} />
            <Route path="/chemistry" element={<Chemistry />} />
            <Route path="/nursing" element={<Nursing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
