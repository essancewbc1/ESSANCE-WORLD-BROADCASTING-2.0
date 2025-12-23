
import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

const Contact: React.FC = () => {
  const { contactConfig } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate high-tech transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-fadeIn">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Contact Info Side */}
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-outfit font-extrabold text-white mb-6">Establish Connection</h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              Have a demo to share? A technical inquiry? Or just want to transmit some good vibes? Our frequency is open.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Direct Signal</h4>
                <p className="text-xl text-white font-semibold">{contactConfig.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Station Coordinates</h4>
                <p className="text-xl text-white font-semibold">{contactConfig.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Broadcast Window</h4>
                <p className="text-xl text-white font-semibold">24/7 Global Transmission</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex gap-4">
            {['Twitter', 'Instagram', 'Discord'].map((social) => (
              <a key={social} href="#" className="px-5 py-3 glass rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all border border-white/5">
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="relative">
          <div className={`glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-700 ${isSubmitted ? 'scale-95 opacity-50 blur-sm pointer-events-none' : ''}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                  <input required type="text" placeholder="Your Name" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Signal Path</label>
                  <input required type="email" placeholder="email@address.com" className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer">
                  <option>General Transmission</option>
                  <option>Demo Submission</option>
                  <option>Press Inquiry</option>
                  <option>Technical Support</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message Content</label>
                <textarea required rows={5} placeholder="Describe your inquiry..." className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600 resize-none"></textarea>
              </div>
              <button 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all relative overflow-hidden group ${isSubmitting ? 'bg-slate-800 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-500/20 active:scale-95'}`}
              >
                <span className={`flex items-center justify-center gap-3 ${isSubmitting ? 'animate-pulse' : ''}`}>
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Encrypting...
                    </>
                  ) : 'Broadcast Message'}
                </span>
              </button>
            </form>
          </div>

          {/* Success Overlay */}
          {isSubmitted && (
            <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
              <div className="text-center p-12 glass rounded-[2.5rem] border border-green-500/30 shadow-2xl bg-green-500/5">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-outfit font-bold text-white mb-2">Transmission Received</h3>
                <p className="text-slate-400 mb-8 max-w-[280px] mx-auto">Your signal has been successfully routed to our main studio. Expect a response soon.</p>
                <button onClick={() => setIsSubmitted(false)} className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors">Send New Signal</button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Aesthetic Bottom Section */}
      <div className="mt-32 pt-16 border-t border-white/5 grid md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h5 className="text-white font-bold mb-3">Live Feed Support</h5>
          <p className="text-sm text-slate-500">For real-time audio issues, use our built-in AIAssistant on the bottom right of the terminal.</p>
        </div>
        <div>
          <h5 className="text-white font-bold mb-3">Demo Submissions</h5>
          <p className="text-sm text-slate-500">We accept .wav and .flac links only via the Demo dropdown in the contact form above.</p>
        </div>
        <div>
          <h5 className="text-white font-bold mb-3">Encryption Protocol</h5>
          <p className="text-sm text-slate-500">All messages sent via this terminal are encrypted using NovaWave AES-256 standards.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
