import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Database, Network, Activity, Zap } from 'lucide-react';

export default function InteractiveCore() {
  const [activeNode, setActiveNode] = useState<string>('Neural Core');
  const [pulseCount, setPulseCount] = useState<number>(0);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'SYS_INIT: GrowthOS Generative Engine activated.',
    'NODE_SECURE: AES-256 secure tunnel bound.',
    'TUNNEL_STABLE: Direct link to quantum node established.',
  ]);

  // Periodic simulation of system operations
  useEffect(() => {
    const logs = [
      'METRIC_SYNC: Latency stable at 2.14ms.',
      'SIGNAL_MINING: Scanned 2,500 enterprise endpoints.',
      'DECISION_ENGINE: Autonomous logic re-evaluation scheduled.',
      'FLOW_DIST: Omni-channel load balance healthy.',
      'RECURSIVE_LEARNING: Model generation v4.0.12 optimized.',
      'SYS_HEALTH: Memory utilization at 43.2%.',
    ];

    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      setSystemLogs((prev) => [`[${timestamp}] ${randomLog}`, ...prev.slice(0, 4)]);
      setPulseCount((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (nodeName: string) => {
    setActiveNode(nodeName);
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setSystemLogs((prev) => [`[${timestamp}] USER_INTERACT: Focused on ${nodeName} node.`, ...prev.slice(0, 4)]);
    setPulseCount((prev) => prev + 1);
  };

  const nodes = [
    { name: 'Neural Core', x: 200, y: 150, icon: Cpu, color: 'text-brand-cyan' },
    { name: 'Signal Miner', x: 90, y: 80, icon: Network, color: 'text-brand-cyan' },
    { name: 'Vector DB', x: 310, y: 80, icon: Database, color: 'text-purple-400' },
    { name: 'Flow Controller', x: 90, y: 220, icon: Zap, color: 'text-amber-400' },
    { name: 'Telemetry Engine', x: 310, y: 220, icon: Activity, color: 'text-emerald-400' },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto glass-panel dark:bg-[#121317]/80 rounded-2xl border-white/10 p-4 md:p-6 glow-cyan overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Interactive holographic dashboard title */}
      <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-brand-cyan" />
          <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider">
            Holographic Interface v4.0
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
          </span>
          <span className="font-mono text-[10px] text-gray-400 uppercase">
            {activeNode} Active
          </span>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="relative aspect-video w-full flex items-center justify-center bg-brand-dark/20 dark:bg-black/40 rounded-xl border border-white/5 overflow-hidden">
        
        {/* Glowing Orbits */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-brand-cyan/25"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-purple-500/20"
          />
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[80px] h-[80px] rounded-full bg-brand-cyan/10 border border-brand-cyan/40 filter blur-sm"
          />
        </div>

        {/* Central Core Pulse Effect */}
        <div className="absolute pointer-events-none">
          <motion.div
            key={pulseCount}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-16 h-16 rounded-full bg-brand-cyan/40"
          />
        </div>

        {/* Dynamic Nodes */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full select-none">
          {/* Connection Lines from Core to Nodes */}
          {nodes.map((node, i) => {
            if (node.name === 'Neural Core') return null;
            return (
              <line
                key={`line-${i}`}
                x1="200"
                y1="150"
                x2={node.x}
                y2={node.y}
                stroke="url(#cyan-gradient)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                className="opacity-45"
              />
            );
          })}

          <defs>
            <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7bd6d1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        {/* HTML elements positioned over SVG to support easy clicks, hover & tooltips */}
        <div className="absolute inset-0">
          {nodes.map((node) => {
            const NodeIcon = node.icon;
            const isFocused = activeNode === node.name;
            
            // Calculate absolute % coordinates from 400x300 viewBox coordinates
            const leftPercent = `${(node.x / 400) * 100}%`;
            const topPercent = `${(node.y / 300) * 100}%`;

            return (
              <div
                key={node.name}
                style={{ left: leftPercent, top: topPercent }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                onClick={() => handleNodeClick(node.name)}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isFocused 
                      ? 'bg-brand-cyan text-brand-dark shadow-[0_0_20px_#7bd6d1] border border-brand-cyan' 
                      : 'bg-brand-dark/90 text-gray-300 border border-white/10 hover:border-brand-cyan/50 hover:bg-brand-surface'
                  }`}
                >
                  <NodeIcon className="w-5 h-5" />
                </motion.div>
                
                {/* Node Labels */}
                <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-brand-dark/95 border border-white/10 rounded px-2 py-0.5 whitespace-nowrap opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  <span className="font-display text-[9px] font-semibold text-gray-200">
                    {node.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live System Console Logs */}
      <div className="mt-4 p-3 bg-brand-dark/60 rounded-xl border border-white/5 font-mono text-[11px] text-gray-400 space-y-1.5 min-h-[110px] select-text">
        <div className="flex justify-between items-center text-[10px] text-brand-cyan/80 uppercase tracking-widest border-b border-white/5 pb-1 mb-1.5">
          <span>Telemetry Stream</span>
          <span className="animate-pulse">Live</span>
        </div>
        {systemLogs.map((log, index) => (
          <div key={index} className={`truncate ${index === 0 ? 'text-gray-100 font-medium' : 'text-gray-400 opacity-80'}`}>
            <span className="text-brand-cyan/60 mr-2">&gt;</span>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
