import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.4,
    filter: 'blur(5px)',
    transform: 'scale(1.1)', // Prevent white edges from blur
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
  },
  logo: {
    fontSize: '48px',
    fontWeight: '950',
    color: '#ffffff',
    letterSpacing: '8px',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  credit: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#005ce6',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    marginBottom: '40px',
  },
  barContainer: {
    width: '240px',
    height: '2px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '100px',
    overflow: 'hidden',
    margin: '0 auto',
  },
  bar: (progress) => ({
    width: `${progress}%`,
    height: '100%',
    backgroundColor: '#ffffff',
    transition: 'width 0.1s ease-out',
    boxShadow: '0 0 20px rgba(255,255,255,0.5)',
  }),
  progressText: {
    marginTop: '16px',
    fontSize: '10px',
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '700',
    letterSpacing: '1px',
  }
};

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            onComplete?.();
          }, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={styles.container}
        >
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 5, ease: "linear" }}
            src="/premium-car.png" 
            alt="Loading" 
            style={styles.bgImage} 
          />
          <div style={styles.overlay} />

          <div style={styles.content}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={styles.logo}>CareCaire</h1>
              <p style={styles.credit}>Created by Aziz Aabbour</p>
            </motion.div>

            <div style={styles.barContainer}>
              <div style={styles.bar(progress)} />
            </div>

            <p style={styles.progressText}>{progress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
