import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa6';
import { RiCarLine } from 'react-icons/ri';

export default function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,240,255,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.03) 0%, transparent 50%)' }} />
      
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
        <div className="glass-card-strong p-8 md:p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center"><RiCarLine className="text-white text-xl" /></div>
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>Care<span className="gradient-text">Caire</span></span>
            </Link>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-primary)' }}>Welcome Back</h1>
            <p className="text-white/40 text-sm">Sign in to your account</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-cyan-500/30 transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type={show ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full pl-11 pr-11 py-3.5 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-cyan-500/30 transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
              <button onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">{show ? <FiEyeOff /> : <FiEye />}</button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center gap-2 text-white/40"><input type="checkbox" className="accent-cyan-400" /> Remember me</label>
            <a href="#" className="text-cyan-400 hover:text-cyan-300">Forgot password?</a>
          </div>

          <button className="glow-btn-solid w-full !py-3.5 mb-6">Sign In <FiArrowRight /></button>

          <div className="relative mb-6"><div className="absolute inset-0 flex items-center"><div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} /></div><div className="relative flex justify-center"><span className="px-4 text-xs text-white/30" style={{ background: 'var(--bg-secondary)' }}>or continue with</span></div></div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="glow-btn !py-3 text-sm"><FaGoogle /> Google</button>
            <button className="glow-btn !py-3 text-sm"><FaGithub /> GitHub</button>
          </div>

          <p className="text-center text-sm text-white/40">Don't have an account? <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">Sign Up</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
