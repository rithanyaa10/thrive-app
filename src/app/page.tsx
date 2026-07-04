import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bolt, Terminal, Rocket, Shield, Database, Layers, Network, ChevronRight, Activity, Cpu, Sparkles, Send, CheckCircle } from 'lucide-react';
import InteractiveCore from '../components/InteractiveCore';
import MetricCard from '../components/MetricCard';
import { ActivePage, MetricData, FrameworkLayer } from '../types';

interface PageProps {
  onPageChange: (page: ActivePage) => void;
  activeMobileTab: string;
}

export default function LandingPage({ onPageChange, activeMobileTab }: PageProps) {
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [briefingForm, setBriefingForm] = useState({ name: '', email: '', company: '' });
  const [briefingStatus, setBriefingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [selectedFramework, setSelectedFramework] = useState<number | null>(null);

  const metrics: MetricData[] = [
    {
      label: 'Avg. Revenue Increase',
      value: '412',
      suffix: '%',
      change: '+12.4%',
      subtext: 'Enterprise Batch v4.0',
      trend: 'up'
    },
    {
      label: 'Operational Efficiency',
      value: '88',
      suffix: '%',
      change: '+8.2%',
      subtext: 'Reduction in Manual Tasking',
      trend: 'up'
    },
    {
      label: 'AI Autonomy Rate',
      value: '94',
      suffix: '%',
      change: 'STABLE',
      subtext: 'Zero-Touch Decisioning',
      trend: 'neutral'
    }
  ];

  const frameworkLayers: FrameworkLayer[] = [
    {
      step: '01',
      tag: 'DATA ARCHITECTURE',
      title: 'Unified Intelligence Layer',
      desc: 'Connect your entire stack into a single neural node. Real-time ingestion of signals from over 2,500+ enterprise endpoints.',
      metrics: ['Latency: 2ms', '99.9% Up-time'],
      icon: 'database'
    },
    {
      step: '02',
      tag: 'DETECTION',
      title: 'Signal Mining',
      desc: 'Identify invisible growth patterns using generative pattern-matching algorithms that constantly monitor system telemetry.',
      icon: 'radar'
    },
    {
      step: '03',
      tag: 'DECISION',
      title: 'Autonomous Logic',
      desc: 'AI agents execute complex tactical maneuvers without human intervention, accelerating execution speed by 10x.',
      icon: 'brain'
    },
    {
      step: '04',
      tag: 'DISTRIBUTION',
      title: 'Omni-Channel Flow',
      desc: 'Hyper-personalized content delivery across every customer touchpoint simultaneously, matching intent in milliseconds.',
      icon: 'share'
    },
    {
      step: '05',
      tag: 'DEVELOPMENT',
      title: 'Recursive Learning',
      desc: 'The system improves with every cycle, self-correcting business strategy in real-time with zero human oversight.',
      icon: 'cycle'
    }
  ];

  const handleBriefingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBriefingStatus('loading');
    setTimeout(() => {
      setBriefingStatus('success');
      setTimeout(() => {
        setShowBriefingModal(false);
        setBriefingStatus('idle');
        setBriefingForm({ name: '', email: '', company: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[750px] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-12">
        <div className="absolute inset-0 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Engine Active Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass-panel dark:bg-[#121317]/80 border-brand-cyan/20 rounded-full animate-pulse-slow"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#7bd6d1]" />
            <span className="font-mono text-[10px] text-brand-cyan font-semibold tracking-widest uppercase">
              v4.0 GENERATIVE ENGINE ACTIVE
            </span>
          </motion.div>

          {/* Big Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-8xl text-white dark:text-white text-gray-900 font-extrabold tracking-tighter leading-none"
          >
            Scale at <span className="text-brand-cyan text-glow">Machine Speed</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            GrowthOS leverages the proprietary 5D Framework to automate tactical decision-making, hyper-personalize customer journeys, and unlock exponential enterprise velocity.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => onPageChange('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-cyan text-brand-dark font-display font-bold rounded-xl hover:scale-105 active:scale-95 transition-all glow-cyan flex items-center justify-center gap-2 group cursor-pointer"
            >
              Initialize Growth Engine
              <Bolt className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            <button 
              onClick={() => onPageChange('login')}
              className="w-full sm:w-auto px-8 py-4 glass-panel text-white font-display font-medium rounded-xl border-white/10 hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Secure Login Console
              <Terminal className="w-5 h-5 text-brand-cyan" />
            </button>
          </motion.div>
        </div>

        {/* Dynamic Interactive Core Representation */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 w-full max-w-3xl px-4 relative z-10"
        >
          <InteractiveCore />
        </motion.div>
      </section>

      {/* Social Proof Logos */}
      <section className="py-8 border-y border-white/5 bg-brand-dark/20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            Trusted by Next-Gen Enterprise Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-brand-cyan" />
              <span className="font-display font-bold text-lg text-white">Stellaris</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="font-display font-bold text-lg text-white">Aegis AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-400" />
              <span className="font-display font-bold text-lg text-white">VortexData</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span className="font-display font-bold text-lg text-white">NexusLabs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5D Framework Grid Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            The 5D Framework
          </h2>
          <p className="font-sans text-gray-400">
            Precision-engineered layers designed to eliminate operational friction and unleash automated growth vectors at every stage of the business lifecycle.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Card 1: Data Architecture (Wide) */}
          <div 
            onClick={() => setSelectedFramework(0)}
            className="col-span-12 md:col-span-8 glass-panel hover:border-brand-cyan/40 dark:bg-[#121317]/80 p-6 md:p-8 rounded-xl border-white/5 relative group overflow-hidden cursor-pointer transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Network className="w-36 h-36 text-brand-cyan" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-brand-cyan font-bold mb-2 block tracking-widest uppercase">
                  {frameworkLayers[0].step} / {frameworkLayers[0].tag}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-4">
                  {frameworkLayers[0].title}
                </h3>
                <p className="font-sans text-gray-400 max-w-lg">
                  {frameworkLayers[0].desc}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                {frameworkLayers[0].metrics?.map((m, idx) => (
                  <span key={idx} className="px-3 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-mono text-xs font-semibold">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Detection (Small) */}
          <div 
            onClick={() => setSelectedFramework(1)}
            className="col-span-12 md:col-span-4 glass-panel hover:border-brand-cyan/40 dark:bg-[#121317]/80 p-6 rounded-xl border-white/5 group cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-brand-cyan font-bold tracking-widest block mb-1 uppercase">
                {frameworkLayers[1].step} / {frameworkLayers[1].tag}
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {frameworkLayers[1].title}
              </h3>
              <p className="font-sans text-xs text-gray-400">
                {frameworkLayers[1].desc}
              </p>
            </div>
          </div>

          {/* Card 3: Decision (Small) */}
          <div 
            onClick={() => setSelectedFramework(2)}
            className="col-span-12 md:col-span-4 glass-panel hover:border-brand-cyan/40 dark:bg-[#121317]/80 p-6 rounded-xl border-white/5 group cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-brand-cyan font-bold tracking-widest block mb-1 uppercase">
                {frameworkLayers[2].step} / {frameworkLayers[2].tag}
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {frameworkLayers[2].title}
              </h3>
              <p className="font-sans text-xs text-gray-400">
                {frameworkLayers[2].desc}
              </p>
            </div>
          </div>

          {/* Card 4: Distribution (Medium) */}
          <div 
            onClick={() => setSelectedFramework(3)}
            className="col-span-12 md:col-span-4 glass-panel hover:border-brand-cyan/40 dark:bg-[#121317]/80 p-6 rounded-xl border-white/5 group cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-brand-cyan font-bold tracking-widest block mb-1 uppercase">
                {frameworkLayers[3].step} / {frameworkLayers[3].tag}
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {frameworkLayers[3].title}
              </h3>
              <p className="font-sans text-xs text-gray-400">
                {frameworkLayers[3].desc}
              </p>
            </div>
          </div>

          {/* Card 5: Development (Medium) */}
          <div 
            onClick={() => setSelectedFramework(4)}
            className="col-span-12 md:col-span-4 glass-panel hover:border-brand-cyan/40 dark:bg-[#121317]/80 p-6 rounded-xl border-white/5 group cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/25 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-brand-cyan font-bold tracking-widest block mb-1 uppercase">
                {frameworkLayers[4].step} / {frameworkLayers[4].tag}
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {frameworkLayers[4].title}
              </h3>
              <p className="font-sans text-xs text-gray-400">
                {frameworkLayers[4].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Snapshots */}
      <section className="bg-brand-dark/40 py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-display text-3xl font-extrabold text-white">
              System Performance Telemetry
            </h2>
            <p className="font-sans text-sm text-gray-400 max-w-lg mx-auto">
              Real-time aggregation of key performance and throughput indicators across active enterprise nodes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((metric, idx) => (
              <div key={metric.label}>
                <MetricCard data={metric} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-6 relative">
        <div className="absolute inset-0 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="glass-panel dark:bg-[#121317]/80 p-8 md:p-16 rounded-3xl border-brand-cyan/20 text-center relative z-10 space-y-6">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to Transcend the Human Bottleneck?
          </h2>
          <p className="font-sans text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Join 500+ market leaders deploying GrowthOS to automate tactical expansion, optimize resources, and scale secure nodes globally.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button 
              onClick={() => onPageChange('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-cyan text-brand-dark font-display font-bold rounded-xl hover:scale-105 active:scale-95 transition-all glow-cyan"
            >
              Deploy Enterprise Node
            </button>
            <button 
              onClick={() => setShowBriefingModal(true)}
              className="w-full sm:w-auto px-8 py-4 glass-panel text-white font-display font-medium rounded-xl border-white/10 hover:bg-white/5 transition-all active:scale-95"
            >
              Request Executive Briefing
            </button>
          </div>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest pt-4">
            SECURE SHELL CONNECTION v4.0.12 - GROWTHOS LTD.
          </p>
        </div>
      </section>

      {/* Interactive Detail Framework Overlay Modal */}
      {selectedFramework !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md glass-panel dark:bg-[#121317] p-6 rounded-2xl glow-cyan border-brand-cyan/30"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-brand-cyan font-bold tracking-widest uppercase">
                Layer Specs / {frameworkLayers[selectedFramework].tag}
              </span>
              <button 
                onClick={() => setSelectedFramework(null)}
                className="text-gray-400 hover:text-white font-mono text-xs"
              >
                [CLOSE]
              </button>
            </div>
            <h3 className="font-display text-2xl font-extrabold text-white mb-2">
              {frameworkLayers[selectedFramework].title}
            </h3>
            <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6">
              {frameworkLayers[selectedFramework].desc}
            </p>
            <div className="p-4 bg-brand-dark/40 rounded-xl border border-white/5 space-y-2">
              <p className="font-mono text-[10px] text-brand-cyan uppercase tracking-wider font-bold">
                Operational Status
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-sans text-xs text-gray-300">Active Node Connection Complete</span>
              </div>
              <p className="font-sans text-xs text-gray-400">
                Data pipeline successfully synchronizing with localized LLM processing grids.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Briefing Modal */}
      {showBriefingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md glass-panel dark:bg-[#121317] p-8 rounded-2xl glow-cyan"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl font-bold text-white">
                Request Executive Briefing
              </h3>
              <button 
                onClick={() => setShowBriefingModal(false)}
                className="text-gray-400 hover:text-white font-mono text-xs"
              >
                ✕
              </button>
            </div>

            {briefingStatus === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center mx-auto text-brand-cyan">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg font-bold text-white">Briefing Request Queued</h4>
                <p className="font-sans text-xs text-gray-400 max-w-xs mx-auto">
                  A designated integration architect will establish secure contact within the next 4 system cycles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBriefingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input 
                    required
                    type="text"
                    value={briefingForm.name}
                    onChange={(e) => setBriefingForm({ ...briefingForm, name: e.target.value })}
                    className="w-full h-11 bg-brand-dark/40 border border-white/5 rounded-lg px-3 font-sans text-sm text-white focus:border-brand-cyan outline-none"
                    placeholder="Commander Shepard"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Enterprise Email</label>
                  <input 
                    required
                    type="email"
                    value={briefingForm.email}
                    onChange={(e) => setBriefingForm({ ...briefingForm, email: e.target.value })}
                    className="w-full h-11 bg-brand-dark/40 border border-white/5 rounded-lg px-3 font-sans text-sm text-white focus:border-brand-cyan outline-none"
                    placeholder="shepard@alliance.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Company / Agency</label>
                  <input 
                    required
                    type="text"
                    value={briefingForm.company}
                    onChange={(e) => setBriefingForm({ ...briefingForm, company: e.target.value })}
                    className="w-full h-11 bg-brand-dark/40 border border-white/5 rounded-lg px-3 font-sans text-sm text-white focus:border-brand-cyan outline-none"
                    placeholder="Systems Alliance"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={briefingStatus === 'loading'}
                  className="w-full h-12 bg-brand-cyan text-brand-dark font-mono text-xs uppercase tracking-widest font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all mt-6 flex items-center justify-center gap-2"
                >
                  {briefingStatus === 'loading' ? 'Transmitting...' : 'Transmit Request'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
