import React from 'react';
import { LayoutDashboard, Users, BarChart3, Bot } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPageChange: (page: 'landing' | 'login' | 'signup') => void;
}

export default function BottomNav({ activeTab, setActiveTab, onPageChange }: BottomNavProps) {
  const tabs = [
    { id: 'framework', label: 'Framework', icon: LayoutDashboard },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'copilot', label: 'Copilot', icon: Bot },
  ];

  return (
    <footer className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-20 pb-safe px-4 bg-brand-surface/90 dark:bg-brand-dark/95 backdrop-blur-2xl border-t border-white/10 rounded-t-xl shadow-2xl">
      {tabs.map((tab) => {
        const TabIcon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              onPageChange('landing'); // Jump back to landing to show interactive sections
            }}
            className={`flex flex-col items-center justify-center gap-1 active:scale-90 transition-all duration-150 ${
              isActive 
                ? 'text-brand-cyan drop-shadow-[0_0_8px_rgba(123,214,209,0.5)]' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <TabIcon className="w-5 h-5" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">
              {tab.label}
            </span>
          </button>
        );
      })}
    </footer>
  );
}
