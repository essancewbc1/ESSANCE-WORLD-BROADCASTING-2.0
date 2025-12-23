
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { getAIRecommendation } from '../geminiService';

interface TestResult {
  name: string;
  status: 'pending' | 'pass' | 'fail';
  message: string;
}

const Diagnostics: React.FC = () => {
  const { isMaintenanceMode, shows, homeConfig, parkedConfig, aboutConfig, contactConfig } = useAppContext();
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const runTests = async () => {
    setIsRunning(true);
    setLog([]);
    setResults([]);
    
    addLog("Initializing Station Diagnostics...");

    // 1. Data Integrity Test
    addLog("Auditing local data structures...");
    const dataTest: TestResult = { name: "Data Persistence", status: 'pass', message: "All config objects present." };
    if (!shows.length || !homeConfig.heroTitle || !parkedConfig.heading || !aboutConfig.title || !contactConfig.email) {
      dataTest.status = 'fail';
      dataTest.message = "Missing critical configuration data.";
    }
    setResults(prev => [...prev, dataTest]);
    addLog(`Data Audit: ${dataTest.status.toUpperCase()}`);

    // 2. Storage Test
    addLog("Verifying localStorage synchronization...");
    const storageKeys = ['novawave_shows', 'novawave_home', 'novawave_parked', 'novawave_about', 'novawave_contact', 'novawave_maintenance'];
    const missingKeys = storageKeys.filter(k => !localStorage.getItem(k));
    const storageTest: TestResult = { 
      name: "Storage Sync", 
      status: missingKeys.length === 0 ? 'pass' : 'fail', 
      message: missingKeys.length === 0 ? "Storage keys synchronized." : `Missing keys: ${missingKeys.join(', ')}`
    };
    setResults(prev => [...prev, storageTest]);
    addLog(`Storage Sync: ${storageTest.status.toUpperCase()}`);

    // 3. API Connectivity (Gemini)
    addLog("Attempting Gemini API Handshake...");
    try {
      const ping = await getAIRecommendation("respond with exactly the word 'OK' if you can hear me.");
      const apiTest: TestResult = { 
        name: "Gemini API", 
        status: ping.text.toLowerCase().includes('ok') ? 'pass' : 'fail', 
        message: ping.text.toLowerCase().includes('ok') ? "AI Assistant responsive." : "API returned unexpected response."
      };
      setResults(prev => [...prev, apiTest]);
      addLog(`API Handshake: ${apiTest.status.toUpperCase()}`);
    } catch (e) {
      setResults(prev => [...prev, { name: "Gemini API", status: 'fail', message: "Connection refused or API key invalid." }]);
      addLog("API Handshake: FAILED");
    }

    // 4. Signal Check
    addLog("Checking Signal Protocol (Maintenance Mode)...");
    const signalTest: TestResult = { 
      name: "Broadcast State", 
      status: 'pass', 
      message: isMaintenanceMode ? "System currently in PARKING mode." : "System currently in LIVE mode." 
    };
    setResults(prev => [...prev, signalTest]);
    addLog(`Signal Protocol: ${signalTest.status.toUpperCase()}`);

    addLog("Diagnostics Complete.");
    setIsRunning(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Station Health Monitor</h3>
          <p className="text-slate-500 text-sm">Run real-time diagnostics on API, Storage, and Logic.</p>
        </div>
        <button 
          onClick={runTests}
          disabled={isRunning}
          className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${isRunning ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20'}`}
        >
          {isRunning ? 'Scanning...' : 'Execute Full Test'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {results.map((res, i) => (
            <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${res.status === 'pass' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {res.status === 'pass' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{res.name}</h4>
                <p className="text-slate-500 text-xs">{res.message}</p>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <div className="h-48 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center text-slate-600 text-sm italic">
              Ready for system scan...
            </div>
          )}
        </div>

        <div className="bg-black/40 rounded-2xl p-6 font-mono text-xs border border-white/5 h-[300px] overflow-y-auto space-y-1 no-scrollbar shadow-inner">
          <div className="text-indigo-400 mb-2 font-bold uppercase tracking-widest border-b border-indigo-500/20 pb-2 flex justify-between">
            <span>System Log</span>
            <span className="animate-pulse">_</span>
          </div>
          {log.map((line, i) => (
            <div key={i} className="text-slate-400">
              <span className="text-slate-600 mr-2">{line.split(' ')[0]}</span>
              {line.split(' ').slice(1).join(' ')}
            </div>
          ))}
          {log.length === 0 && <div className="text-slate-700 italic">No log data.</div>}
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
