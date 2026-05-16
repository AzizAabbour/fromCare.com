import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiTarget, FiHeart, FiGlobe, FiAward, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useInView, useCounter } from '../hooks/useAnimations';

gsap.registerPlugin(ScrollTrigger);

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  sectionLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#005ce6',
    marginBottom: '16px',
    padding: '8px 16px',
    background: 'rgba(0, 92, 230, 0.05)',
    borderRadius: '100px',
  },
  title: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: '950',
    color: '#000000',
    marginBottom: '16px',
    letterSpacing: '-2px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666666',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  statsSection: {
    padding: '60px 0',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    backgroundColor: '#fcfcfc',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginTop: '40px',
  },
  valueCard: {
    padding: '40px 30px',
    background: '#ffffff',
    borderRadius: '24px',
    border: '1px solid rgba(0,0,0,0.05)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
  },
  valueIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    margin: '0 auto 24px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#005ce6',
    background: 'rgba(0, 92, 230, 0.05)',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
  },
  teamCard: {
    padding: '32px',
    background: '#ffffff',
    borderRadius: '24px',
    border: '1px solid rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    margin: '0 auto 20px auto',
    background: 'linear-gradient(135deg, #005ce6, #00d2ff)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '800',
  }
};

const values = [
  { icon: <FiTarget />, title: 'Innovation', desc: 'Repousser les limites avec des technologies de pointe.' },
  { icon: <FiHeart />, title: 'Client d\'Abord', desc: 'Chaque décision vise à offrir une expérience exceptionnelle.' },
  { icon: <FiGlobe />, title: 'Durabilité', desc: 'Engagés pour un avenir plus vert avec notre flotte hybride.' },
  { icon: <FiAward />, title: 'Excellence', desc: 'Une qualité sans compromis dans chaque interaction.' },
];

const team = [
  { name: 'Aziz Aabbour', role: 'Fondateur & CEO', avatar: 'AA' },
  { name: 'Sarah Mitchell', role: 'CTO', avatar: 'SM' },
  { name: 'James Lee', role: 'Directeur Design', avatar: 'JL' },
  { name: 'Maria Garcia', role: 'Directrice Opérations', avatar: 'MG' },
];

function AnimatedStat({ value, suffix, label }) {
  const [ref, inView] = useInView();
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '32px', fontWeight: '950', color: '#005ce6', letterSpacing: '-1px' }}>
        {count.toLocaleString()}{suffix}
      </div>
      <p style={{ fontSize: '12px', fontWeight: '700', color: '#888888', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
    </div>
  );
}

export default function About() {
  const pageRef = useRef(null);

  return (
    <div ref={pageRef} style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: '80px 0' }}>
        <div style={styles.container}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={styles.sectionLabel}><HiOutlineSparkles /> À Propos</div>
            <h1 style={styles.title}>Redéfinir la <span style={{ color: '#005ce6' }}>Mobilité</span></h1>
            <p style={styles.subtitle}>CareCaire est une plateforme de nouvelle génération alliant location de prestige et technologie de suivi intelligente.</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={styles.statsSection}>
        <div style={{ ...styles.container, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '40px' }}>
          <AnimatedStat value={2500} suffix="+" label="Véhicules" />
          <AnimatedStat value={15000} suffix="+" label="Clients Heureux" />
          <AnimatedStat value={50} suffix="+" label="Villes" />
          <AnimatedStat value={98} suffix="%" label="Satisfaction" />
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 0' }}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.sectionLabel}>Nos Valeurs</div>
            <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#000000' }}>Ce qui nous <span style={{ color: '#005ce6' }}>anime</span></h2>
          </div>
          <div style={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }} 
                style={styles.valueCard}
              >
                <div style={styles.valueIcon}>{v.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', color: '#000000' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.6' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '100px 0', backgroundColor: '#fcfcfc' }}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.sectionLabel}>L'Équipe</div>
            <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#000000' }}>Rencontrez nos <span style={{ color: '#005ce6' }}>experts</span></h2>
          </div>
          <div style={styles.teamGrid}>
            {team.map((t, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} style={styles.teamCard}>
                <div style={styles.avatar}>{t.avatar}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#000000', margin: 0 }}>{t.name}</h3>
                <p style={{ fontSize: '13px', color: '#005ce6', fontWeight: '700', marginTop: '6px' }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0' }}>
        <div style={styles.container}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            style={{ 
              background: '#000000', 
              padding: '80px 40px', 
              borderRadius: '40px', 
              textAlign: 'center',
              color: '#ffffff'
            }}
          >
            <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '16px' }}>Prêt à commencer ?</h2>
            <p style={{ opacity: 0.6, marginBottom: '32px', fontSize: '18px' }}>Rejoignez des milliers de clients satisfaits et vivez la mobilité premium.</p>
            <a href="/vehicles" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '12px', 
              background: '#ffffff', 
              color: '#000000', 
              padding: '16px 40px', 
              borderRadius: '16px', 
              textDecoration: 'none', 
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Explorer la Flotte <FiTrendingUp />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
