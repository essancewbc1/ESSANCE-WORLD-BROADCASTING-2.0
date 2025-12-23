
import React from 'react';
import { useAppContext } from '../AppContext';

const Schedule: React.FC = () => {
  const { shows } = useAppContext();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-outfit font-extrabold text-white mb-4">Broadcasting Schedule</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Synchronize your time zone. Our global schedule ensures premium audio content 24/7 across all coordinates.
        </p>
      </div>

      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {days.map((day, idx) => (
          <button
            key={day}
            className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
              idx === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {shows.map((show, idx) => (
          <div
            key={show.id}
            className="group glass rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 border border-white/5 hover:border-indigo-500/30 transition-all"
          >
            <div className="text-2xl font-outfit font-bold text-slate-500 w-32 md:text-right">
              {show.time.split(' - ')[0]}
            </div>
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img src={show.image} alt={show.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <h4 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{show.title}</h4>
              <p className="text-slate-400 text-sm line-clamp-1">{show.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-300 font-semibold">{show.dj}</span>
              <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
