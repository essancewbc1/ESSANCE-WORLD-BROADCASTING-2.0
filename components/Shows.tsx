
import React from 'react';
import { useAppContext } from '../AppContext';

const Shows: React.FC = () => {
  const { shows } = useAppContext();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fadeIn">
      <div className="mb-16">
        <h1 className="text-5xl font-outfit font-extrabold text-white mb-4 text-center md:text-left">Resident Masters</h1>
        <p className="text-xl text-slate-400 max-w-2xl text-center md:text-left">
          The curators behind the sounds. Meet the DJs that define the NovaWave identity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {shows.map((show) => (
          <div key={show.id} className="group glass rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all border border-white/5">
            <div className="h-64 overflow-hidden relative">
              <img
                src={show.image}
                alt={show.dj}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <h3 className="text-3xl font-outfit font-bold text-white mb-1">{show.dj}</h3>
                <p className="text-indigo-400 font-bold uppercase text-xs tracking-widest">{show.title}</p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-300 leading-relaxed mb-6 italic">"{show.description}"</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {show.genre?.map((g) => (
                  <span key={g} className="px-3 py-1 bg-slate-800 rounded text-xs font-bold text-slate-400 uppercase">{g}</span>
                ))}
              </div>
              <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors border border-white/5">
                Listen to Archives
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;
