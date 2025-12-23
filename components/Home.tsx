
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const Home: React.FC = () => {
  const { shows, currentTrack, homeConfig } = useAppContext();
  
  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={homeConfig.heroBg}
            alt="Studio background"
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
              Live from Orbit
            </span>
            <h1 className="text-6xl md:text-8xl font-outfit font-extrabold text-white mb-6 leading-none">
              {homeConfig.heroTitle.split(' ').map((word, i) => (
                word.toLowerCase().includes('wave') ? (
                  <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">{word} </span>
                ) : word + ' '
              ))}
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
              {homeConfig.heroSubtitle}
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all active:scale-95 shadow-xl shadow-white/10">
                Listen Live
              </button>
              <Link to="/schedule" className="px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-white/10 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all">
                Full Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Currently Playing Card */}
      <section className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        <div className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="relative w-48 h-48 flex-shrink-0 group">
            <img
              src={currentTrack.albumArt}
              alt="Album art"
              className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-red-500 text-xs font-bold uppercase tracking-wider">Now Playing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">{currentTrack.title}</h2>
            <p className="text-xl text-slate-400 mb-6">{currentTrack.artist}</p>
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500 justify-center md:justify-start">
              <span className="bg-slate-800 px-3 py-1 rounded text-slate-300">Lossless Audio</span>
              <span className="bg-slate-800 px-3 py-1 rounded text-slate-300">NovaWave HD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Shows */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-3xl font-outfit font-bold text-white mb-2">Featured Shows</h3>
            <p className="text-slate-400">Hand-picked broadcasts from our residency team.</p>
          </div>
          <Link to="/shows" className="text-indigo-400 font-bold hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shows.slice(0, 4).map((show) => (
            <div key={show.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold mb-1 line-clamp-1">{show.title}</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider">{show.dj}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
