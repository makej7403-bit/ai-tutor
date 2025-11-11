import React from "react";

export default function Footer(){
  return (
    <footer className="py-6 text-center text-sm text-gray-600">
      <div className="container">
        © {new Date().getFullYear()} FullTask AI Tutor — Created by Akin S. Sokpah
      </div>
    </footer>
  );
}
