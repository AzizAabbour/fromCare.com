import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 50%)' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center relative z-10">
        <motion.h1 initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="text-[150px] md:text-[200px] font-black leading-none gradient-text" style={{ fontFamily: 'var(--font-primary)' }}>404</motion.h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 -mt-4" style={{ fontFamily: 'var(--font-primary)' }}>Page Not Found</h2>
        <p className="text-white/40 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="glow-btn-solid !py-3.5 !px-8"><FiHome /> Go Home</Link>
          <button onClick={() => window.history.back()} className="glow-btn !py-3.5 !px-8"><FiArrowLeft /> Go Back</button>
        </div>
      </motion.div>
    </div>
  );
}
