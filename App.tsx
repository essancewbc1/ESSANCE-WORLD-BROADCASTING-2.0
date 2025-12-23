
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Shows from './components/Shows';
import About from './components/About';
import AudioPlayer from './components/AudioPlayer';
import AIAssistant from './components/AIAssistant';
import { NAVIGATION_LINKS } from './constants';

const App: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <span className="text-2xl font-outfit font-extrabold tracking-tight text-white uppercase">NovaWave</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-indigo-400 ${
                  location.pathname === link.path ? 'text-indigo-400' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsAssistantOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full font-bold text-sm transition-all hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            AI Assistant
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Persistent Components */}
      <AudioPlayer />
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-12 pb-44">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 NovaWave Radio. Broadcast from the Ether.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
