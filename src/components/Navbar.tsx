import React, { useState } from 'react';
import { Activity, Bell, Sun, Moon, Menu, X, Shield, Cpu } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  onPageChange: (page: ActivePage) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ activePage, onPageChange, isDarkMode, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-16 bg-brand-surface/80 dark:bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
      
      {/* Brand Identity */}
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onPageChange('landing')}
      >
        <div className="p-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 group-hover:bg-brand-cyan/25 transition-all">
          <Cpu className="w-5 h-5 text-brand-cyan" />
        </div>
        <span className="font-display text-lg font-bold tracking-tighter text-white dark:text-white text-gray-900 group-hover:text-brand-cyan transition-colors">
          GrowthOS
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => onPageChange('landing')}
          className={`font-mono text-xs uppercase tracking-widest transition-colors ${
            activePage === 'landing' 
              ? 'text-brand-cyan font-semibold' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Framework
        </button>
        <button 
          onClick={() => onPageChange('login')}
          className={`font-mono text-xs uppercase tracking-widest transition-colors ${
            activePage === 'login' 
              ? 'text-brand-cyan font-semibold' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Secure Node
        </button>
        <button 
          onClick={() => onPageChange('signup')}
          className={`font-mono text-xs uppercase tracking-widest transition-colors ${
            activePage === 'signup' 
              ? 'text-brand-cyan font-semibold' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Provisioning
        </button>
      </nav>

      {/* User Actions & Dark Mode Toggles */}
      <div className="flex items-center gap-4">
        {/* Theme Toggler */}
        <button 
          onClick={onToggleTheme}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
        </button>

        {/* Notifications Mock */}
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-cyan" />
        </button>

        {/* Dynamic CTA Button */}
        <button 
          onClick={() => onPageChange(activePage === 'landing' ? 'login' : 'landing')}
          className="hidden sm:inline-block bg-brand-cyan/10 hover:bg-brand-cyan text-brand-cyan hover:text-brand-dark border border-brand-cyan/30 px-4 py-1.5 rounded font-mono text-xs uppercase tracking-wider transition-all active:scale-95"
        >
          {activePage === 'landing' ? 'Get Started' : 'Dashboard'}
        </button>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 glass-panel border-b border-white/5 p-6 md:hidden flex flex-col gap-4 animate-fadeIn">
          <button 
            onClick={() => { onPageChange('landing'); setIsOpen(false); }}
            className="text-left py-2 font-mono text-xs uppercase tracking-widest text-gray-200"
          >
            Framework
          </button>
          <button 
            onClick={() => { onPageChange('login'); setIsOpen(false); }}
            className="text-left py-2 font-mono text-xs uppercase tracking-widest text-gray-200"
          >
            Secure Sign-In
          </button>
          <button 
            onClick={() => { onPageChange('signup'); setIsOpen(false); }}
            className="text-left py-2 font-mono text-xs uppercase tracking-widest text-gray-200"
          >
            Provision Account
          </button>
          <button 
            onClick={() => { onPageChange('login'); setIsOpen(false); }}
            className="w-full mt-2 bg-brand-cyan text-brand-dark py-3 rounded-lg font-mono text-xs uppercase tracking-widest text-center"
          >
            Initialize Connection
          </button>
        </div>
      )}
    </header>
  );
}
