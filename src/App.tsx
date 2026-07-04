import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import LandingPage from './app/page';
import LoginPage from './app/login/page';
import SignupPage from './app/signup/page';
import { ActivePage } from './types';
import { ShieldAlert, RefreshCw, Server, HelpCircle, CheckCircle } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [activeMobileTab, setActiveMobileTab] = useState<string>('framework');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [showStatusIndicator, setShowStatusIndicator] = useState(true);

  // Synchronize route with URL hash on load and change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/login') {
        setActivePage('login');
      } else if (hash === '#/signup') {
        setActivePage('signup');
      } else {
        setActivePage('landing');
      }
    };

    // Initialize state from hash on first load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash whenever active page state is changed programmatically
  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    if (page === 'landing') {
      window.location.hash = '#/';
    } else {
      window.location.hash = `#/${page}`;
    }
    // Scroll to top of window on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manage Dark/Light theme class on document body
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0B0C10] text-[#e3e2e8]' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Cyber-grid Design Accent */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${
        isDarkMode ? 'cyber-grid' : 'cyber-grid-light'
      }`} />

      {/* Primary Global Navigation */}
      <Navbar 
        activePage={activePage} 
        onPageChange={handlePageChange} 
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Main App Workspace Viewport */}
      <main className="relative z-10 pt-24 px-6 md:px-10 max-w-7xl mx-auto min-h-[calc(100vh-10rem)]">
        
        {/* Real-time Cloud Environment Notification banner */}
        {showStatusIndicator && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono select-none ${
              isDarkMode 
                ? 'bg-[#121317]/80 border-white/5 text-gray-400' 
                : 'bg-white border-slate-200 text-slate-600 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>ENVIRONMENT STATE:</span>
              <span className="text-brand-cyan font-bold">VITE+CLOUD NODE ACTIVE</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-block text-gray-500">
                IP_ROUTE: Local Host (3000)
              </span>
              <button 
                onClick={() => setShowStatusIndicator(false)}
                className="hover:text-white dark:hover:text-white hover:text-black font-bold font-mono px-1.5 cursor-pointer"
              >
                [DISMISS]
              </button>
            </div>
          </motion.div>
        )}

        {/* View Transition Orchestrator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activePage === 'landing' && (
              <LandingPage 
                onPageChange={handlePageChange} 
                activeMobileTab={activeMobileTab} 
              />
            )}
            {activePage === 'login' && (
              <LoginPage onPageChange={handlePageChange} />
            )}
            {activePage === 'signup' && (
              <SignupPage onPageChange={handlePageChange} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Desktop Global Footer Section */}
      <footer className="hidden md:block py-12 border-t border-white/5 mt-16 text-center select-none bg-brand-dark/25">
        <div className="max-w-7xl mx-auto px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-brand-cyan" />
              <span>AES-256 SYSTEM SECURITY</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-brand-cyan" />
              <span>TELEMETRY STABLE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hover:text-brand-cyan transition-colors cursor-pointer">TERMS OF USE</span>
            <span>•</span>
            <span className="hover:text-brand-cyan transition-colors cursor-pointer">API RECOGNITION</span>
            <span>•</span>
            <span className="hover:text-brand-cyan transition-colors cursor-pointer">SYSTEM STATUS</span>
          </div>
          
          <span>© 2026 GROWTHOS CORP. ALL RIGHTS SECURED.</span>
        </div>
      </footer>

      {/* Bottom responsive layout navigation (for touch screens / mobile layouts) */}
      <BottomNav 
        activeTab={activeMobileTab} 
        setActiveTab={setActiveMobileTab} 
        onPageChange={handlePageChange}
      />
    </div>
  );
}
