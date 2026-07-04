import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, RefreshCw, CheckCircle, AlertCircle, ArrowRight, Server, Key, Terminal } from 'lucide-react';
import { ActivePage, FormErrors } from '../../types';

interface PageProps {
  onPageChange: (page: ActivePage) => void;
}

export default function SignupPage({ onPageChange }: PageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Statuses for the complex multi-step provisioning animation
  const [status, setStatus] = useState<'idle' | 'provisioning' | 'complete'>('idle');
  const [provisioningStep, setProvisioningStep] = useState(0);

  const steps = [
    'Verifying agency domain...',
    'Allocating isolated sandbox memory...',
    'Generating primary node encryption keys...',
    'Synchronizing 5D pipeline models...',
    'Registering telemetry credentials...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'provisioning') {
      interval = setInterval(() => {
        setProvisioningStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              setStatus('complete');
              setTimeout(() => {
                alert('GrowthOS Account Provisioned successfully. Welcome to the workspace!');
                onPageChange('landing');
                setStatus('idle');
                setProvisioningStep(0);
              }, 1000);
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: 'N/A', color: 'bg-gray-700' };
    if (pass.length < 6) return { score: 1, text: 'Weak (Entropy Threshold Low)', color: 'bg-red-500' };
    if (pass.length < 10) return { score: 2, text: 'Medium (Adequate Level)', color: 'bg-amber-400' };
    return { score: 3, text: 'Strong (Secure Node Level)', color: 'bg-brand-cyan' };
  };

  const strength = getPasswordStrength(password);

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};

    if (!name.trim()) {
      tempErrors.name = 'Organization/Administrator name is required.';
    }

    if (!email) {
      tempErrors.email = 'Corporate email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please provide a valid system email.';
    }

    if (!password) {
      tempErrors.password = 'Security password is required.';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must meet the 6-character limit.';
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('provisioning');
    setProvisioningStep(0);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[500px] space-y-6 z-10">

        {/* Head branding */}
        <div className="flex flex-col items-center text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 glass-panel dark:bg-[#121317]/80 rounded-2xl flex items-center justify-center mb-4 glow-cyan border border-brand-cyan/30"
          >
            <Server className="w-8 h-8 text-brand-cyan" />
          </motion.div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tighter">
            GrowthOS
          </h1>
          <p className="font-sans text-sm text-gray-400">
            Node Deployment & Provisioning Registry
          </p>
        </div>

        {/* Main signup box */}
        <div className="glass-panel dark:bg-[#121317]/80 p-6 md:p-8 rounded-2xl glow-cyan shadow-2xl relative overflow-hidden border border-white/5">
          
          {/* Signin / Signup Tabs */}
          <div className="flex border-b border-white/5 mb-6">
            <button 
              onClick={() => onPageChange('login')}
              className="flex-1 pb-3 font-mono text-xs text-gray-400 hover:text-white border-b-2 border-transparent transition-all uppercase tracking-widest"
            >
              Sign In
            </button>
            <button 
              className="flex-1 pb-3 font-mono text-xs font-bold text-brand-cyan border-b-2 border-brand-cyan uppercase tracking-widest"
            >
              Create Account
            </button>
          </div>

          {status === 'provisioning' || status === 'complete' ? (
            /* Immersive high-fidelity active provisioning console */
            <div className="py-8 space-y-6">
              <div className="flex items-center justify-center">
                <RefreshCw className="w-10 h-10 text-brand-cyan animate-spin" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  Provisioning Active Node
                </h4>
                <p className="font-mono text-xs text-brand-cyan">
                  Step {provisioningStep + 1} of {steps.length}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-brand-dark/60 rounded-full overflow-hidden border border-white/5 p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((provisioningStep + 1) / steps.length) * 100}%` }}
                  transition={{ ease: "easeInOut" }}
                  className="h-full bg-brand-cyan rounded-full glow-cyan-sm"
                />
              </div>

              {/* Steps logger */}
              <div className="p-4 bg-brand-dark/50 rounded-xl border border-white/5 font-mono text-[11px] text-gray-400 space-y-2 select-text">
                <p className="text-brand-cyan/70 font-semibold border-b border-white/5 pb-1">System Console Log</p>
                {steps.map((stepText, idx) => {
                  const isDone = idx < provisioningStep;
                  const isActive = idx === provisioningStep;
                  
                  return (
                    <div 
                      key={stepText} 
                      className={`flex items-center gap-2 transition-opacity ${
                        isDone ? 'text-gray-500' : isActive ? 'text-white font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span>
                        {isDone ? '✓' : isActive ? '❯' : '•'}
                      </span>
                      <span>{stepText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              
              {/* Org Name */}
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block pl-1">
                  ORGANIZATION / ADMIN NAME
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-cyan transition-colors">
                    <User className="w-4 h-4" />
                  </span>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full h-11 bg-brand-dark/40 border ${
                      errors.name ? 'border-red-500' : 'border-white/5 group-focus-within:border-brand-cyan'
                    } rounded-lg pl-11 pr-4 text-white font-sans text-sm focus:border-brand-cyan outline-none transition-all placeholder:text-gray-600`}
                    placeholder="Alliance Fleet Command"
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-1.5 text-red-400 font-sans text-[11px] pl-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block pl-1">
                  ENTERPRISE EMAIL
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-cyan transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full h-11 bg-brand-dark/40 border ${
                      errors.email ? 'border-red-500' : 'border-white/5 group-focus-within:border-brand-cyan'
                    } rounded-lg pl-11 pr-4 text-white font-sans text-sm focus:border-brand-cyan outline-none transition-all placeholder:text-gray-600`}
                    placeholder="commander@alliance.com"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-1.5 text-red-400 font-sans text-[11px] pl-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block pl-1">
                  SECURITY PASSWORD
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-cyan transition-colors">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full h-11 bg-brand-dark/40 border ${
                      errors.password ? 'border-red-500' : 'border-white/5 group-focus-within:border-brand-cyan'
                    } rounded-lg pl-11 pr-11 text-white font-sans text-sm focus:border-brand-cyan outline-none transition-all placeholder:text-gray-600`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-cyan"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Real-time Strength Indicator */}
                {password && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-400 uppercase">Entropy Rating</span>
                      <span className={strength.score === 3 ? 'text-brand-cyan font-bold' : strength.score === 2 ? 'text-amber-400 font-bold' : 'text-red-400'}>
                        {strength.text}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-brand-dark/60 rounded-full overflow-hidden flex gap-1 p-0.5 border border-white/5">
                      <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: `${(strength.score / 3) * 100}%` }} />
                    </div>
                  </div>
                )}

                {errors.password && (
                  <div className="flex items-center gap-1.5 text-red-400 font-sans text-[11px] pl-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block pl-1">
                  CONFIRM SECURITY KEY
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-cyan transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full h-11 bg-brand-dark/40 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-white/5 group-focus-within:border-brand-cyan'
                    } rounded-lg pl-11 pr-4 text-white font-sans text-sm focus:border-brand-cyan outline-none transition-all placeholder:text-gray-600`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1.5 text-red-400 font-sans text-[11px] pl-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <button 
                type="submit"
                className="w-full h-12 bg-brand-cyan text-brand-dark font-mono text-xs uppercase tracking-widest font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all mt-4 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(123,214,209,0.25)]"
              >
                Provision Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-center mt-6 font-sans text-[11px] text-gray-500">
            Already have an active enterprise node? <span onClick={() => onPageChange('login')} className="underline hover:text-brand-cyan cursor-pointer">Sign in directly</span>.
          </p>
        </div>

        {/* Legal indicators */}
        <div className="flex flex-col md:flex-row justify-between items-center opacity-45 text-gray-500 gap-2 px-1">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span className="font-mono text-[9px] uppercase">AES-256 SECURED</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span className="font-mono text-[9px] uppercase">ISO-27001 COMPLIANT</span>
            </div>
          </div>
          <span className="font-mono text-[9px]">REGISTRY SERVICE v4.2.0</span>
        </div>

      </div>
    </div>
  );
}
