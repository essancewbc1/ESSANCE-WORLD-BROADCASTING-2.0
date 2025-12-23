
import React from 'react';
import { useAppContext } from '../AppContext';

const About: React.FC = () => {
  const { aboutConfig } = useAppContext();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fadeIn">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-outfit font-extrabold text-white mb-8">{aboutConfig.title}</h1>
        <p className="text-2xl text-indigo-400 font-medium mb-12">
          {aboutConfig.visionTitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <img src="https://picsum.photos/seed/about1/800/600" alt="Studio Setup" className="rounded-3xl shadow-2xl border border-white/5" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-outfit font-bold text-white">Our Vision</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            {aboutConfig.description1}
          </p>
          <p className="text-slate-400 leading-relaxed text-lg">
            {aboutConfig.description2}
          </p>
          <div className="pt-4 flex gap-8">
            <div>
              <p className="text-3xl font-outfit font-extrabold text-white">{aboutConfig.stats.ops}</p>
              <p className="text-slate-500 text-sm uppercase font-bold tracking-widest">Global Ops</p>
            </div>
            <div>
              <p className="text-3xl font-outfit font-extrabold text-white">{aboutConfig.stats.residencies}</p>
              <p className="text-slate-500 text-sm uppercase font-bold tracking-widest">Residencies</p>
            </div>
            <div>
              <p className="text-3xl font-outfit font-extrabold text-white">{aboutConfig.stats.soundscapes}</p>
              <p className="text-slate-500 text-sm uppercase font-bold tracking-widest">Soundscapes</p>
            </div>
          </div>
        </div>
      </div>

      <section className="glass rounded-3xl p-12 text-center border border-white/10">
        <h2 className="text-3xl font-outfit font-bold text-white mb-6">Join the Community</h2>
        <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
          Sign up for our monthly newsletter for track IDs, exclusive live set downloads, and hardware reviews.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-all">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
