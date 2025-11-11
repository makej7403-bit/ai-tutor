import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Biology from "./pages/Biology";
import Chemistry from "./pages/Chemistry";
import Nursing from "./pages/Nursing";

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav className="bg-white shadow p-4 flex gap-4">
          <Link to="/" className="font-bold">FullTask AI Tutor</Link>
          <Link to="/biology">Biology</Link>
          <Link to="/chemistry">Chemistry</Link>
          <Link to="/nursing">Nursing</Link>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/biology" element={<Biology/>}/>
            <Route path="/chemistry" element={<Chemistry/>}/>
            <Route path="/nursing" element={<Nursing/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
