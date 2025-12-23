
import React from 'react';

const ParkingPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center p-6 overflow-hidden py-20 animate-fadeIn">
      {/* Background Ambience - Contained within the relative parent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/5 blur-[100px] rounded-full animate-pulse [animation-delay:1s]"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl w-full">
        <div className="mb-12 inline-block relative">
          <div className="w-24 h-24 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/20 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Offline</div>
        </div>

        <h1 className="text-5xl md:text-6xl font-outfit font-extrabold text-white mb-6 tracking-tight">
          Signal Interrupted.
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 leading-relaxed">
          NovaWave is currently undergoing scheduled maintenance. We are recalibrating our frequency to bring you a better listening experience.
        </p>

        <div className="glass p-8 rounded-3xl border border-white/5 inline-flex items-center gap-6">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-8 bg-indigo-500/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Status Report</span>
            <span className="text-white font-medium">Calibrating Studio Hardware...</span>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-8">
          <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
        NovaWave Broadcast Systems • Maintenance Protocol Active
      </div>
    </div>
  );
};

export default ParkingPage;
