import { useEffect, useRef, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiPlay, FiCheckCircle } from 'react-icons/fi';
import ModelViewer from '../components/ModelViewer';
import { fadeInUp, staggerContainer, hoverPremium } from '../utils/animations';
import { useInView, useCounter } from '../hooks/useAnimations';

// Pure CSS Styles
const styles = {
  heroSection: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  heroBgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  heroImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.6,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: '#ffffff',
    padding: '0 24px',
  },
  heroSubtitle: {
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: '#005ce6',
    marginBottom: '20px',
    display: 'block',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 10vw, 7rem)',
    fontWeight: '950',
    lineHeight: '0.85',
    margin: '0 0 40px 0',
    textTransform: 'uppercase',
    letterSpacing: '-4px',
  },
  heroDesc: {
    fontSize: '18px',
    fontWeight: '400',
    maxWidth: '650px',
    margin: '0 auto 48px auto',
    opacity: 0.8,
    lineHeight: '1.6',
    color: '#e0e0e0',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '24px',
  },
  btnPrimary: {
    padding: '18px 48px',
    backgroundColor: '#005ce6',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textDecoration: 'none',
    borderRadius: '100px',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 10px 30px rgba(0, 92, 230, 0.3)',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 48px',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '100px',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  statsSection: {
    padding: '120px 0',
    backgroundColor: '#ffffff',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '40px',
  },
  statItem: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  statValue: {
    fontFamily: 'var(--font-primary)',
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: '900',
    color: '#000000',
    letterSpacing: '-0.05em',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  statLabel: {
    fontFamily: 'var(--font-primary)',
    fontSize: '11px',
    fontWeight: '700',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
  },
  bentoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '32px',
    padding: '80px 0',
  },
  bentoMain: {
    gridColumn: 'span 7',
    height: '600px',
    position: 'relative',
    borderRadius: '40px',
    overflow: 'hidden',
  },
  bentoSide: {
    gridColumn: 'span 5',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  bentoSmall: {
    flex: 1,
    position: 'relative',
    borderRadius: '40px',
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
  },
  bentoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  bentoOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '40px',
    color: '#ffffff',
  }
};

function StatCounter({ end, suffix, label }) {
  const [ref, inView] = useInView();
  const count = useCounter(parseInt(end), 2000, inView);
  return (
    <motion.div ref={ref} variants={fadeInUp} style={styles.statItem}>
      <div style={styles.statValue}>
        {count}
        <span style={{ fontSize: '24px', fontWeight: '800', marginLeft: '4px', opacity: 0.8 }}>{suffix}</span>
      </div>
      <div style={styles.statLabel}>{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} style={{ backgroundColor: '#ffffff' }}>
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <motion.div style={{ ...styles.heroBgWrapper, y: heroY, scale: heroScale, opacity: heroOpacity }}>
          <img src="/premium-car.png" alt="Hero" style={styles.heroImg} />
          <div style={styles.heroOverlay} />
        </motion.div>

        <div style={styles.heroContent}>
          <motion.div variants={staggerContainer} initial="initial" animate="whileInView" viewport={{ once: true }}>
            <motion.span variants={fadeInUp} style={styles.heroSubtitle}>Nouvelle Expérience</motion.span>
            <motion.h1 variants={fadeInUp} style={styles.heroTitle}>
              DOMINEZ LA <br /> <span style={{ color: '#005ce6' }}>ROUTE</span>
            </motion.h1>
            <motion.p variants={fadeInUp} style={styles.heroDesc}>
              Performance électrisante, design visionnaire et technologie de pointe. Redéfinissez vos limites avec CareCaire E-Tech.
            </motion.p>
            <motion.div variants={fadeInUp} style={styles.buttonGroup}>
              <Link 
                to="/vehicles" 
                style={styles.btnPrimary}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 92, 230, 0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 92, 230, 0.3)'; }}
              >
                Configurer
              </Link>
              <Link to="/about" style={styles.btnSecondary}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Découvrir l'Histoire
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="whileInView" 
            viewport={{ once: true }} 
            style={styles.statsGrid}
          >
            <StatCounter end="145" suffix=" CH" label="Puissance Totale" />
            <StatCounter end="900" suffix=" KM" label="Autonomie WLTP" />
            <StatCounter end="4" suffix=".1 L" label="Consommation Moyenne" />
            <StatCounter end="93" suffix=" G" label="CO2 / KM" />
          </motion.div>
        </div>
      </section>

      {/* Interactive 3D */}
      <section style={{ padding: '100px 0', backgroundColor: '#fcfcfc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '950', letterSpacing: '-2px' }}>DESIGN <span style={{ color: '#005ce6' }}>INTERACTIF</span></h2>
            <p style={{ color: '#888888', maxWidth: '600px', margin: '20px auto' }}>Explorez chaque courbe de notre ingénierie de précision à travers notre visualiseur 3D haute performance.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ height: '600px', background: 'transparent', borderRadius: '40px', overflow: 'hidden', position: 'relative' }}
          >
            <ModelViewer
              url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
              width="100%"
              height="100%"
              modelXOffset={0}
              modelYOffset={0}
              enableMouseParallax={true}
              enableHoverRotation={true}
              environmentPreset="apartment"
              fadeIn={false}
              autoRotate={false}
              autoRotateSpeed={0.35}
              showScreenshotButton={false}
              placeholderSrc="/premium_porsche_3d_render_1778957200737.png"
            />
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <style>{`
            @media (max-width: 991px) {
              .bento-grid-res { display: flex !important; flex-direction: column !important; }
              .bento-grid-res > div { grid-column: span 12 !important; height: 500px !important; }
            }
          `}</style>
          <div className="bento-grid-res" style={styles.bentoGrid}>
            <motion.div 
              variants={fadeInUp} 
              initial="initial" 
              whileInView="whileInView" 
              viewport={{ once: true }}
              style={styles.bentoMain}
            >
              <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000" style={styles.bentoImg} alt="Interior" />
              <div style={styles.bentoOverlay}>
                <h3 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 12px 0' }}>Cockpit OpenR</h3>
                <p style={{ opacity: 0.8, fontSize: '16px', margin: '0 0 24px 0' }}>Un écran de 10,4" avec Google intégré pour une expérience intuitive.</p>
                <Link to="/vehicles" style={{ color: '#ffffff', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Explorer <FiArrowRight />
                </Link>
              </div>
            </motion.div>

            <div style={styles.bentoSide}>
              <motion.div 
                variants={fadeInUp} 
                initial="initial" 
                whileInView="whileInView" 
                viewport={{ once: true }}
                style={styles.bentoSmall}
              >
                <img src="/ev-tech.png" style={styles.bentoImg} alt="EV" />
                <div style={styles.bentoOverlay}>
                  <h4 style={{ fontSize: '20px', fontWeight: '900', margin: 0 }}>Moteur Hybride</h4>
                </div>
              </motion.div>
              <motion.div 
                variants={fadeInUp} 
                initial="initial" 
                whileInView="whileInView" 
                viewport={{ once: true }}
                style={styles.bentoSmall}
              >
                <img src="/hybrid-exterior.png" style={styles.bentoImg} alt="Exterior" />
                <div style={styles.bentoOverlay}>
                  <h4 style={{ fontSize: '20px', fontWeight: '900', margin: 0 }}>Esprit Alpine</h4>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '120px 0', textAlign: 'center', backgroundColor: '#000000', color: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: '950', letterSpacing: '-2px', marginBottom: '32px' }}
          >
            VIVEZ L'EXPÉRIENCE <br/> <span style={{ color: '#005ce6' }}>SANS ATTENDRE</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}
          >
            <Link to="/vehicles" style={styles.btnPrimary}>Réserver un Essai</Link>
            <Link to="/contact" style={styles.btnSecondary}>Nous Contacter</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
