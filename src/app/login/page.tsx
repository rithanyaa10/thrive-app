import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Fingerprint, ShieldCheck, CloudLightning, Terminal, ArrowRight, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { ActivePage, FormErrors } from '../../types';

interface PageProps {
  onPageChange: (page: ActivePage) => void;
}

export default function LoginPage({ onPageChange }: PageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [biometricStatus, setBiometricStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    
    // Email validate
    if (!email) {
      tempErrors.email = 'Enterprise email credentials are required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Invalid system email format.';
    }

    // Password validate
    if (!password) {
      tempErrors.password = 'Authentication password is required.';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must meet the 6-character entropy threshold.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    
    // Simulate high-security enterprise sign-in
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        // Mock authorization completed
        alert('Access Granted. GrowthOS authorization code successfully validated. Redirecting...');
        onPageChange('landing');
        setStatus('idle');
      }, 1500);
    }, 2000);
  };

  const handleBiometricClick = () => {
    setBiometricStatus('scanning');
    setTimeout(() => {
      setBiometricStatus('success');
      setTimeout(() => {
        alert('Biometric credential signature verified. Access Authorized.');
        onPageChange('landing');
        setBiometricStatus('idle');
      }, 1000);
    }, 2000);
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[480px] space-y-6 z-10">
        
        {/* Header branding */}
        <div className="flex flex-col items-center text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-16 h-16 glass-panel dark:bg-[#121317]/80 rounded-2xl flex items-center justify-center mb-4 glow-cyan border border-brand-cyan/30"
          >
            <ShieldCheck className="w-8 h-8 text-brand-cyan" />
          </motion.div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tighter">
            GrowthOS
          </h1>
          <p className="font-sans text-sm text-gray-400">
            Secure Intelligence Access Console
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-panel dark:bg-[#121317]/80 p-6 md:p-8 rounded-2xl glow-cyan shadow-2xl relative overflow-hidden border border-white/5">
          
          {/* Tabs switcher */}
          <div className="flex border-b border-white/5 mb-6">
            <button 
              className="flex-1 pb-3 font-mono text-xs font-bold text-brand-cyan border-b-2 border-brand-cyan uppercase tracking-widest"
            >
              Sign In
            </button>
            <button 
              onClick={() => onPageChange('signup')}
              className="flex-1 pb-3 font-mono text-xs text-gray-400 hover:text-white border-b-2 border-transparent transition-all uppercase tracking-widest"
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div className="space-y-1.5">
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
                  disabled={status === 'submitting'}
                  className={`w-full h-12 bg-brand-dark/40 border ${
                    errors.email ? 'border-red-500' : 'border-white/5 group-focus-within:border-brand-cyan'
                  } rounded-lg pl-11 pr-4 text-white font-sans text-sm focus:border-brand-cyan outline-none transition-all placeholder:text-gray-600`}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1.5 text-red-400 font-sans text-[11px] pl-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  PASSWORD
                </label>
                <button 
                  type="button"
                  onClick={() => alert('Password recovery link dispatched to master directory database.')}
                  className="text-[9px] font-mono text-brand-cyan uppercase hover:underline"
                >
                  FORGOT?
                </button>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-cyan transition-colors">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={status === 'submitting'}
                  className={`w-full h-12 bg-brand-dark/40 border ${
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
              {errors.password && (
                <div className="flex items-center gap-1.5 text-red-400 font-sans text-[11px] pl-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Simulated Biometric Login box */}
            <div className="flex items-center gap-3 p-3 bg-brand-cyan/5 border border-brand-cyan/15 rounded-lg">
              <Fingerprint className={`w-5 h-5 text-brand-cyan ${biometricStatus === 'scanning' ? 'animate-pulse text-purple-400' : ''}`} />
              <div className="flex-1">
                <p className="font-mono text-[9px] text-brand-cyan font-bold tracking-widest">BIOMETRIC DETECTED</p>
                <p className="font-sans text-[11px] text-gray-400">
                  {biometricStatus === 'scanning' ? 'Initializing biosecure scan...' : 'Authenticate with WebAuthn/FaceID'}
                </p>
              </div>
              <button 
                type="button"
                onClick={handleBiometricClick}
                disabled={biometricStatus === 'scanning'}
                className="font-mono text-[9px] font-bold text-brand-cyan hover:underline uppercase"
              >
                {biometricStatus === 'scanning' ? 'Scanning' : 'Use Now'}
              </button>
            </div>

            {/* Submit Action */}
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full h-12 bg-brand-cyan text-brand-dark font-mono text-xs uppercase tracking-widest font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(123,214,209,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying Credentials
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4 text-brand-dark" />
                  AUTHORIZED
                </>
              ) : (
                <>
                  Continue to Workspace
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="px-3 font-mono text-[9px] text-gray-500 uppercase tracking-wider">
              Or Secure Connect
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Social login integration */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => {
                alert('Securing connection with Google Identity Provider...');
                onPageChange('landing');
              }}
              className="flex items-center justify-center gap-2 h-11 glass-panel rounded-lg hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1N4BoYDeDX_tn4QQTQrA4mv1VdZwL_rGAqJDHa6iSXuFkATmJfGeWHE_Z-UcKudOE8io6z4Dpf7zfIu5XuXH7e7ZLUHJfTGMMvr0msZrnfpvwPY6FdUU3ahaE_7AbMX64PrUjGmlWgQzUkEjOXhDkpL0-qtdH-eRAwMjZIUWJsGQci0trwiE78uBrQfEI9haxpnynwPq6YBaOZN8QbgPQOaB99TDRdi6cIxt8goo7mAL1bJuqAf0YuvVZqVQKRokigty1RG_xaEk" 
                alt="Google" 
                className="w-4 h-4" 
              />
              <span className="font-mono text-[10px] font-bold text-gray-300">GOOGLE</span>
            </button>
            <button 
              onClick={() => {
                alert('Connecting with Microsoft Azure Active Directory...');
                onPageChange('landing');
              }}
              className="flex items-center justify-center gap-2 h-11 glass-panel rounded-lg hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMSddKZfudVLf7AEk5lYYkAXKX238eS_4s5Mo33XwDtMnzkAxe1J75KKPqZb0t8DrsxpV0kPK-KmMaFi32IDQjmBw98X5Y9IMu-ob8ecyYHg2kJE-M7VbCn3K1zf2VaGXS8dbcQiiyFZIt7Ndk9qeGmh4v0q017Kq_LOrtHZQcUQrrVabZPLZPozzFexzifa7AEnd6_pq1yiXHJU372FW8hJnffM_CUWvtRIZDW4l_S0-wWpN41n_dD4_GQ3Gl4RqunY5Uy38DMrY" 
                alt="Microsoft" 
                className="w-4 h-4" 
              />
              <span className="font-mono text-[10px] font-bold text-gray-300">MICROSOFT</span>
            </button>
          </div>

          <p className="text-center mt-6 font-sans text-[11px] text-gray-500 leading-normal">
            By continuing, you agree to the GrowthOS <span className="underline cursor-pointer hover:text-brand-cyan">Enterprise Terms</span> and <span className="underline cursor-pointer hover:text-brand-cyan">Security Policy</span>.
          </p>
        </div>

        {/* Encrypted network state indicators */}
        <div className="flex flex-col md:flex-row justify-between items-center opacity-45 text-gray-500 gap-2 px-1">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span className="font-mono text-[9px] uppercase">AES-256 ENCRYPTED</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <span className="font-mono text-[9px] uppercase">COMPLIANT NODE</span>
            </div>
          </div>
          <span className="font-mono text-[9px]">SYSTEM v4.2.0-STABLE | © 2026 GROWTHOS CORP</span>
        </div>

      </div>
    </div>
  );
}
