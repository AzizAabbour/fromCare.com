import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSliders } from 'react-icons/fi';
import VehicleCard from '../components/VehicleCard';
import { vehicles, categories } from '../data/vehicles';
import { fadeInUp, staggerContainer } from '../utils/animations';

const styles = {
  pageContainer: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
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
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    marginBottom: '60px',
    padding: '32px',
    background: '#fcfcfc',
    borderRadius: '32px',
    border: '1px solid rgba(0,0,0,0.05)',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '0 24px',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid rgba(0,0,0,0.1)',
  },
  searchInput: {
    width: '100%',
    padding: '16px 0',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    color: '#000000',
    background: 'transparent',
  },
  filterGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  filterBtn: (active) => ({
    padding: '10px 24px',
    borderRadius: '100px',
    border: `1px solid ${active ? '#005ce6' : 'rgba(0,0,0,0.1)'}`,
    background: active ? '#005ce6' : 'transparent',
    color: active ? '#ffffff' : '#666666',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '32px',
  }
};

export default function Vehicles() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = vehicles.filter(v => {
    const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        
        <motion.div 
          initial="initial"
          animate="whileInView"
          variants={staggerContainer}
          style={styles.header}
        >
          <motion.h1 variants={fadeInUp} style={styles.title}>Gamme <span style={{ color: '#005ce6' }}>E-Tech</span></motion.h1>
          <motion.p variants={fadeInUp} style={styles.subtitle}>
            Découvrez notre sélection de véhicules premium alliant luxe et performance durable.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          style={styles.controls}
        >
          <div style={styles.searchBox}>
            <FiSearch style={{ color: '#005ce6', fontSize: '20px' }} />
            <input 
              style={styles.searchInput}
              placeholder="Rechercher par modèle ou marque..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div style={styles.filterGroup}>
            {categories.map((cat) => (
              <button 
                key={cat}
                style={styles.filterBtn(activeCategory === cat)}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          style={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle, idx) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredVehicles.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: '#888888', fontSize: '18px' }}>Aucun véhicule ne correspond à votre recherche.</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
