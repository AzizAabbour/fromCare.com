import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiNavigation, FiActivity, FiClock, FiBattery, FiMapPin } from 'react-icons/fi';
import { BsSpeedometer2, BsFuelPump } from 'react-icons/bs';
import { HiOutlineSparkles } from 'react-icons/hi';
import { vehicles } from '../data/vehicles';

const styles = {
  container: {
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '0 5%',
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
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    alignItems: 'start',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sidebarTitle: {
    fontSize: '14px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#111111',
    marginBottom: '8px',
  },
  trackingCard: (isSelected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: isSelected ? '#ffffff' : '#f8f9fa',
    border: `1px solid ${isSelected ? '#005ce6' : 'rgba(0,0,0,0.05)'}`,
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isSelected ? '0 10px 30px rgba(0, 92, 230, 0.1)' : 'none',
  }),
  cardImg: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#111111',
    margin: 0,
  },
  cardBrand: {
    fontSize: '12px',
    color: '#888888',
    margin: '2px 0 0 0',
  },
  statusDot: (active) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: active ? '#10b981' : '#ef4444',
    boxShadow: `0 0 10px ${active ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
  }),
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statBox: {
    padding: '24px 16px',
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.05)',
    borderRadius: '20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  statIcon: (color) => ({
    fontSize: '24px',
    color: color === 'cyan' ? '#005ce6' : color === 'emerald' ? '#10b981' : '#8b5cf6',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'center',
  }),
  statLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '900',
    color: '#111111',
  },
  mapContainer: {
    position: 'relative',
    height: '550px',
    background: '#fcfcfc',
    borderRadius: '24px',
    border: '1px solid rgba(0,0,0,0.05)',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
  },
  mapGrid: {
    position: 'absolute',
    inset: 0,
    opacity: 0.05,
    backgroundImage: 'radial-gradient(#005ce6 0.5px, transparent 0.5px)',
    backgroundSize: '30px 30px',
  },
  selectedInfo: {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    right: '24px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  }
};

function TrackingCard({ vehicle, isSelected, onClick }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      onClick={onClick} 
      style={styles.trackingCard(isSelected)}
    >
      <img src={vehicle.image} alt={vehicle.name} style={styles.cardImg} />
      <div style={styles.cardInfo}>
        <h4 style={styles.cardName}>{vehicle.name}</h4>
        <p style={styles.cardBrand}>{vehicle.brand}</p>
      </div>
      <div style={styles.statusDot(vehicle.available)} />
    </motion.div>
  );
}

export default function Tracking() {
  const [selected, setSelected] = useState(vehicles[0]);
  const [speed, setSpeed] = useState(87);
  const [fuel, setFuel] = useState(72);
  const [battery, setBattery] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 60 + 60));
      setFuel(Math.floor(Math.random() * 30 + 50));
      setBattery(Math.floor(Math.random() * 30 + 60));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { icon: <BsSpeedometer2 />, label: 'Vitesse', value: `${speed} km/h`, color: 'cyan' },
    { icon: <BsFuelPump />, label: 'Carburant', value: `${fuel}%`, color: 'emerald' },
    { icon: <FiBattery />, label: 'Batterie', value: `${battery}%`, color: 'purple' },
    { icon: <FiClock />, label: 'ETA', value: '25 min', color: 'cyan' },
  ];

  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <section style={{ padding: '40px 0' }}>
        <div style={styles.container}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            style={styles.header}
          >
            <div style={styles.sectionLabel}><HiOutlineSparkles /> Suivi en Direct</div>
            <h1 style={styles.title}>Vehicle <span style={{ color: '#005ce6' }}>Tracking</span></h1>
            <p style={styles.subtitle}>Surveillez votre flotte en temps réel avec une précision millimétrée.</p>
          </motion.div>

          <div style={styles.mainGrid}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
              <h3 style={styles.sidebarTitle}>Véhicules de la Flotte</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {vehicles.map((v) => (
                  <TrackingCard key={v.id} vehicle={v} isSelected={selected.id === v.id} onClick={() => setSelected(v)} />
                ))}
              </div>
            </div>

            {/* Map Area */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Stats */}
              <div style={styles.statsGrid}>
                {statCards.map((s, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: i * 0.1 }} 
                    style={styles.statBox}
                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                  >
                    <div style={styles.statIcon(s.color)}>{s.icon}</div>
                    <p style={styles.statLabel}>{s.label}</p>
                    <p style={styles.statValue}>{s.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }} 
                style={styles.mapContainer}
              >
                <div style={styles.mapGrid} />
                
                {/* Simulated Map Content */}
                <div style={{ position: 'absolute', inset: 0 }}>
                  {/* Grid Lines SVG */}
                  <svg style={{ width: '100%', height: '100%', opacity: 0.03 }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#005ce6" strokeWidth="1" />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="#005ce6" strokeWidth="1" />
                    ))}
                  </svg>

                  {/* Markers */}
                  {vehicles.map((v, i) => (
                    <motion.div 
                      key={v.id} 
                      animate={{ scale: [1, 1.15, 1] }} 
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      style={{ 
                        position: 'absolute', 
                        cursor: 'pointer',
                        left: `${20 + (i * 8) % 60}%`, 
                        top: `${20 + (i * 12) % 60}%` 
                      }}
                      onClick={() => setSelected(v)}
                    >
                      <div style={{ 
                        width: '16px', 
                        height: '16px', 
                        borderRadius: '50%', 
                        backgroundColor: v.id === selected.id ? '#005ce6' : 'rgba(0,0,0,0.2)',
                        border: '3px solid #ffffff',
                        boxShadow: v.id === selected.id ? '0 0 20px rgba(0, 92, 230, 0.5)' : 'none'
                      }} />
                      
                      {v.id === selected.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          style={{ 
                            position: 'absolute', 
                            bottom: '25px', 
                            left: '50%', 
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            background: '#000000',
                            color: '#ffffff',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '700'
                          }}
                        >
                          {v.name} · {speed} km/h
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Selected Vehicle Info Overlay */}
                <div style={styles.selectedInfo}>
                  <img src={selected.image} alt={selected.name} style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#111111', margin: 0 }}>{selected.name}</h3>
                    <p style={{ fontSize: '13px', color: '#888888', margin: '4px 0 0 0' }}>{selected.brand} · {selected.category}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#005ce6', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <FiNavigation /> Tracking Actif
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
