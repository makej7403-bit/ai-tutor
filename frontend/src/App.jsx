import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Chat from './components/Chat.jsx';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <Chat />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onSelectPage={setActivePage} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onSelectPage={setActivePage} />
        <main className="flex-1 p-6 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
}
