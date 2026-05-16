import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { pricingPlans } from '../data/vehicles';

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
    margin: '0 auto 32px auto',
    lineHeight: '1.6',
  },
  toggleContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px',
    background: '#f8f9fa',
    borderRadius: '16px',
    border: '1px solid rgba(0,0,0,0.05)',
  },
  toggleBtn: (active) => ({
    padding: '10px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: active ? '#ffffff' : 'transparent',
    color: active ? '#000000' : '#888888',
    boxShadow: active ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
  }),
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginTop: '40px',
  },
  planCard: (isPopular) => ({
    position: 'relative',
    padding: '48px 32px',
    background: '#ffffff',
    borderRadius: '24px',
    border: `1px solid ${isPopular ? '#005ce6' : 'rgba(0,0,0,0.08)'}`,
    boxShadow: isPopular ? '0 20px 40px rgba(0, 92, 230, 0.08)' : '0 10px 30px rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  }),
  popularBadge: {
    position: 'absolute',
    top: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#005ce6',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '100px',
    fontSize: '12px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 4px 15px rgba(0, 92, 230, 0.3)',
  },
  planName: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#000000',
    marginBottom: '8px',
  },
  planDesc: {
    fontSize: '15px',
    color: '#666666',
    marginBottom: '32px',
    lineHeight: '1.5',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px',
    marginBottom: '32px',
  },
  price: {
    fontSize: '48px',
    fontWeight: '950',
    color: '#000000',
    letterSpacing: '-2px',
  },
  pricePeriod: {
    fontSize: '14px',
    color: '#888888',
    fontWeight: '600',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 40px 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    color: '#444444',
    fontWeight: '500',
  },
  featureIcon: {
    color: '#005ce6',
    fontSize: '18px',
    flexShrink: 0,
  },
  ctaBtn: (isPopular) => ({
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    border: isPopular ? 'none' : '1px solid #000000',
    background: isPopular ? '#000000' : 'transparent',
    color: isPopular ? '#ffffff' : '#000000',
    fontSize: '14px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
  })
};

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <section style={{ padding: '60px 0' }}>
        <div style={styles.container}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            style={styles.header}
          >
            <div style={styles.sectionLabel}><HiOutlineSparkles /> Tarifs</div>
            <h1 style={styles.title}>Plan de <span style={{ color: '#005ce6' }}>Location</span></h1>
            <p style={styles.subtitle}>Des formules flexibles adaptées à chaque trajet. Sans engagement.</p>
            
            <div style={styles.toggleContainer}>
              <button onClick={() => setAnnual(false)} style={styles.toggleBtn(!annual)}>Journalier</button>
              <button onClick={() => setAnnual(true)} style={styles.toggleBtn(annual)}>
                Mensuel <span style={{ color: '#10b981', marginLeft: '4px' }}>-20%</span>
              </button>
            </div>
          </motion.div>

          <div style={styles.plansGrid}>
            {pricingPlans.map((plan, i) => {
              const price = annual ? Math.floor(plan.price * 30 * 0.8) : plan.price;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.15 }} 
                  whileHover={{ y: -10 }}
                  style={styles.planCard(plan.popular)}
                >
                  {plan.popular && <div style={styles.popularBadge}>Le Plus Populaire</div>}
                  
                  <h3 style={styles.planName}>{plan.name}</h3>
                  <p style={styles.planDesc}>{plan.description}</p>
                  
                  <div style={styles.priceContainer}>
                    <span style={styles.price}>${price}</span>
                    <span style={styles.pricePeriod}>/{annual ? 'mois' : 'jour'}</span>
                  </div>
                  
                  <ul style={styles.featureList}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={styles.featureItem}>
                        <FiCheck style={styles.featureIcon} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    style={styles.ctaBtn(plan.popular)}
                    onMouseEnter={(e) => {
                      if (!plan.popular) {
                        e.currentTarget.style.background = '#000000';
                        e.currentTarget.style.color = '#ffffff';
                      } else {
                        e.currentTarget.style.opacity = '0.8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.popular) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#000000';
                      } else {
                        e.currentTarget.style.opacity = '1';
                      }
                    }}
                  >
                    Choisir <FiArrowRight />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
