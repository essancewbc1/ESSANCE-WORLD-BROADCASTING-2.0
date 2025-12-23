
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Shows from './components/Shows';
import About from './components/About';
import Contact from './components/Contact';
import Store from './components/Store';
import Admin from './components/Admin';
import ParkingPage from './components/ParkingPage';
import AudioPlayer from './components/AudioPlayer';
import CartDrawer from './components/CartDrawer';
import { NAVIGATION_LINKS } from './constants';
import { AppProvider, useAppContext } from './AppContext';

// Utility component to handle smooth scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const Header: React.FC = () => {
  const location = useLocation();
  const { isSyncing, isMaintenanceMode, cart, setIsCartOpen } = useAppContext();
  const isAdminPage = location.pathname === '/admin';
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
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

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-2 text-slate-400 hover:text-white transition-colors"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
             </svg>
             {cartCount > 0 && (
               <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                 {cartCount}
               </span>
             )}
          </button>

          <Link 
            to="/admin" 
            className={`p-2 transition-all group relative rounded-lg hover:bg-white/5 ${
              isSyncing ? 'animate-admin-working' : (isAdminPage ? 'animate-admin-active' : 'text-slate-400 hover:text-indigo-400')
            }`}
            title={isSyncing ? "Syncing changes..." : "Station Management"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {isAdminPage && !isSyncing && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

const MainContent: React.FC = () => {
  const { isMaintenanceMode } = useAppContext();
  const location = useLocation();
  const isAdminPath = location.pathname === '/admin';

  if (isMaintenanceMode && !isAdminPath) {
    return <ParkingPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/store" element={<Store />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative">
        <Header />

        {/* Main Content */}
        <main className="flex-grow pb-32">
          <MainContent />
        </main>

        {/* Persistent Components */}
        <AudioPlayer />
        <CartDrawer />

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-white/5 py-12 pb-44">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">© 2024 NovaWave Radio. Broadcast from the Ether.</p>
            <div className="mt-6 flex justify-center gap-6">
              <Link to="/admin" className="text-slate-500 hover:text-indigo-400 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin Control Panel
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;
