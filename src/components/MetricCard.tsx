import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricData } from '../types';

interface MetricCardProps {
  data: MetricData;
  index: number;
}

export default function MetricCard({ data, index }: MetricCardProps) {
  const isUp = data.trend === 'up';
  const isDown = data.trend === 'down';

  // Generate mock sparkline path points based on data.label to give unique look to each chart
  const getSparklinePath = (label: string) => {
    if (label.includes('REVENUE')) {
      return "M 0 40 Q 15 20 30 35 T 60 10 T 90 25 T 120 5 T 150 15";
    }
    if (label.includes('EFFICIENCY')) {
      return "M 0 35 Q 15 35 30 15 T 60 25 T 90 10 T 120 15 T 150 5";
    }
    return "M 0 25 Q 15 10 30 30 T 60 15 T 90 20 T 120 5 T 150 8";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden glass-panel dark:bg-[#121317]/70 rounded-xl p-6 border-white/5 glow-cyan-sm flex flex-col justify-between"
    >
      {/* Background Microsparkline Chart Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 150 50" preserveAspectRatio="none">
          <path
            d={getSparklinePath(data.label)}
            fill="none"
            stroke={isUp ? "#7bd6d1" : isDown ? "#f87171" : "#fbbf24"}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">
          {data.label}
        </p>
        
        <h4 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white text-gray-900">
          {data.value}
          <span className="text-brand-cyan text-glow">{data.suffix}</span>
        </h4>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between">
        <div className={`flex items-center gap-1.5 font-mono text-xs ${
          isUp ? 'text-brand-cyan' : isDown ? 'text-red-400' : 'text-amber-400'
        }`}>
          {isUp ? (
            <TrendingUp className="w-4 h-4" />
          ) : isDown ? (
            <TrendingDown className="w-4 h-4" />
          ) : (
            <Minus className="w-4 h-4" />
          )}
          <span className="font-bold">{data.change}</span>
        </div>
        
        <span className="font-sans text-xs text-gray-400">
          {data.subtext}
        </span>
      </div>
    </motion.div>
  );
}
