import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-10 right-10 z-[999]"
        >
          <button
            onClick={scrollToTop}
            className="relative group w-14 h-14 flex items-center justify-center rounded-full overflow-hidden transition-all duration-500"
            style={{
              background: 'rgba(10, 10, 15, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#005ce6] to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            
            {/* Progress Circle (SVG) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="#005ce6"
                strokeWidth="2"
                strokeDasharray="1"
                style={{ pathLength: scrollYProgress, filter: 'drop-shadow(0 0 5px #005ce6)' }}
              />
            </svg>

            <FiArrowUp className="text-xl text-white relative z-10 transition-transform duration-500 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
