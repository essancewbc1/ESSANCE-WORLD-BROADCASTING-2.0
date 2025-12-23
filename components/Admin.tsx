
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { Show, Track, HomeConfig, AboutConfig, ContactConfig, Product } from '../types';

const Admin: React.FC = () => {
  const { 
    shows, currentTrack, products, homeConfig, aboutConfig, contactConfig, isSyncing, isMaintenanceMode,
    updateShows, updateCurrentTrack, updateProducts, updateHomeConfig, updateAboutConfig, updateContactConfig, setIsSyncing, setIsMaintenanceMode
  } = useAppContext();
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('novawave_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  
  // Local UI feedback states
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isSavingHome, setIsSavingHome] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      if (password === 'nova2025') {
        setLoginSuccess(true);
        setIsLoggingIn(false);
        sessionStorage.setItem('novawave_auth', 'true');
        setTimeout(() => setIsAuthenticated(true), 1000);
      } else {
        setIsLoggingIn(false);
        alert('Incorrect password. Access denied.');
      }
    }, 1200);
  };

  const handleSaveHome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingHome(true);
    setIsSyncing(true);
    const formData = new FormData(e.currentTarget);
    const newConfig: HomeConfig = {
      heroTitle: formData.get('heroTitle') as string,
      heroSubtitle: formData.get('heroSubtitle') as string,
      heroBg: formData.get('heroBg') as string,
    };
    setTimeout(() => {
      updateHomeConfig(newConfig);
      setIsSavingHome(false);
      setIsSyncing(false);
    }, 1000);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    updateProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const toggleMaintenance = () => {
    const newState = !isMaintenanceMode;
    setIsSyncing(true);
    setTimeout(() => {
      setIsMaintenanceMode(newState);
      setIsSyncing(false);
    }, 800);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('novawave_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-32 px-4 animate-fadeIn">
        <div className={`glass p-8 rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 ${loginSuccess ? 'scale-105 border-green-500/50' : ''}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${loginSuccess ? 'bg-green-600' : 'bg-indigo-600'}`}>
              {loginSuccess ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-outfit font-bold text-white">{loginSuccess ? 'Access Granted' : 'Admin Login'}</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className={`transition-opacity duration-300 ${loginSuccess ? 'opacity-50' : 'opacity-100'}`}>
              <label className="block text-slate-400 text-sm mb-2 font-medium">Station Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoggingIn || loginSuccess}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
            <button disabled={isLoggingIn || loginSuccess} className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${loginSuccess ? 'bg-green-600 text-white' : isLoggingIn ? 'bg-indigo-800 text-indigo-300' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'}`}>
              {isLoggingIn ? 'Verifying Identity...' : loginSuccess ? 'Initializing Control Panel...' : 'Open Access Port'}
            </button>
            <p className="text-xs text-slate-500 text-center">Authorized personnel only.</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-slideInUp flex flex-col md:flex-row gap-12">
      <aside className="md:w-64 flex-shrink-0">
        <div className="sticky top-28 space-y-2">
          <div className={`mb-6 p-4 rounded-2xl border transition-all duration-300 ${isMaintenanceMode ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
             <div className="flex items-center gap-2 mb-1">
               <span className={`w-2 h-2 rounded-full ${isMaintenanceMode ? 'bg-red-500 animate-pulse' : 'bg-green-500 animate-pulse'}`}></span>
               <span className={`text-[10px] font-black uppercase tracking-widest ${isMaintenanceMode ? 'text-red-400' : 'text-green-400'}`}>
                 {isMaintenanceMode ? 'Station Parked' : 'Station Live'}
               </span>
             </div>
          </div>

          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Station Sections</h4>
          {[
            { id: 'merch', name: 'Inventory Control', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { id: 'home', name: 'Home Hero', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
          ].map(link => (
            <a key={link.id} href={`#${link.id}`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
              </svg>
              <span className="text-sm font-semibold">{link.name}</span>
            </a>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all text-left mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="text-sm font-semibold">Terminate Session</span>
          </button>
        </div>
      </aside>

      <div className="flex-grow space-y-24">
        <div className="sticky top-20 z-40 bg-[#0f172a]/95 backdrop-blur-md -mx-4 px-4 py-4 border-b border-white/5 mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-outfit font-extrabold text-white">Station Control</h1>
            <div className={`flex items-center gap-4 px-4 py-2 rounded-xl border transition-all ${isMaintenanceMode ? 'bg-red-950/30 border-red-500/40' : 'bg-green-950/30 border-green-500/40'}`}>
              <button 
                onClick={toggleMaintenance}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isMaintenanceMode ? 'bg-red-600' : 'bg-green-600'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isMaintenanceMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
        </div>

        <section id="merch" className="scroll-mt-48">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-outfit font-bold text-white">Inventory Control</h2>
            <div className="h-px bg-white/5 flex-grow"></div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {products.map(p => (
              <div key={p.id} className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-6">
                <img src={p.image} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-grow">
                  <h4 className="text-white font-bold">{p.name}</h4>
                  <p className="text-slate-500 text-xs">${p.price} • {p.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${p.inStock ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                    {p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                  </span>
                  <button 
                    onClick={() => handleUpdateProduct(p.id, { inStock: !p.inStock })}
                    className="text-xs text-indigo-400 font-bold hover:underline"
                  >
                    Toggle Stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="home" className="scroll-mt-48">
           <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-outfit font-bold text-white">Home Hero</h2>
            <div className="h-px bg-white/5 flex-grow"></div>
          </div>
          <div className="glass p-8 rounded-3xl border border-white/10 shadow-xl">
            <form onSubmit={handleSaveHome} className="space-y-6">
              <input name="heroTitle" defaultValue={homeConfig.heroTitle} className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-2 text-white" />
              <button disabled={isSavingHome} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">{isSavingHome ? 'Saving...' : 'Save Home Config'}</button>
            </form>
          </div>
        </section>

        <div className="pt-20 text-center border-t border-white/5 text-slate-600 text-xs uppercase tracking-widest font-black">NovaWave CMS v1.6.0</div>
      </div>
    </div>
  );
};

export default Admin;
