export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  },
  viewport: { once: true }
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export const revealX = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export const hoverPremium = {
  whileHover: { 
    y: -10, 
    scale: 1.02,
    transition: { duration: 0.4, ease: "easeOut" } 
  },
  whileTap: { scale: 0.98 }
};

export const pageReveal = {
  initial: { opacity: 0, clipPath: 'inset(10% 0 10% 0)' },
  animate: { opacity: 1, clipPath: 'inset(0% 0 0% 0)' },
  exit: { opacity: 0, clipPath: 'inset(10% 0 10% 0)' },
  transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }
};
