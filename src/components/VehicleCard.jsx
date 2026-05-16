import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiSettings, FiUsers } from 'react-icons/fi';

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
    transition: 'all 0.4s ease',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  imgWrapper: {
    position: 'relative',
    height: '220px',
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
  },
  tag: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#005ce6',
  },
  status: (available) => ({
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: available ? '#10b981' : '#ef4444',
    boxShadow: `0 0 10px ${available ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
  }),
  content: {
    padding: '24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  brand: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '4px',
  },
  name: {
    fontSize: '20px',
    fontWeight: '900',
    color: '#000000',
    marginBottom: '20px',
  },
  specs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '24px',
  },
  specItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#666666',
  },
  specIcon: {
    color: '#005ce6',
    fontSize: '14px',
  },
  footer: {
    paddingTop: '20px',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: '22px',
    fontWeight: '900',
    color: '#000000',
  },
  unit: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#888888',
  },
  btn: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: '#000000',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    transition: 'all 0.3s ease',
  }
};

export default function VehicleCard({ vehicle }) {
  return (
    <Link to={`/vehicles/${vehicle.id}`} style={{ textDecoration: 'none' }}>
      <motion.div 
        style={styles.card}
        whileHover={{ 
          y: -10, 
          boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
          borderColor: 'rgba(0, 92, 230, 0.2)' 
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div style={styles.imgWrapper}>
          <div style={styles.tag}>{vehicle.category}</div>
          <div style={styles.status(vehicle.available)} />
          <motion.img 
            src={vehicle.image} 
            alt={vehicle.name} 
            style={styles.img}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div style={styles.content}>
          <div style={styles.brand}>{vehicle.brand}</div>
          <h3 style={styles.name}>{vehicle.name}</h3>

          <div style={styles.specs}>
            <div style={styles.specItem}><FiZap style={styles.specIcon} /> {vehicle.fuel}</div>
            <div style={styles.specItem}><FiSettings style={styles.specIcon} /> {vehicle.transmission}</div>
            <div style={styles.specItem}><FiUsers style={styles.specIcon} /> {vehicle.seats} Pers.</div>
            <div style={styles.specItem}><FiArrowRight style={styles.specIcon} /> {vehicle.power}</div>
          </div>

          <div style={styles.footer}>
            <div>
              <span style={styles.price}>${vehicle.price}</span>
              <span style={styles.unit}>/ jour</span>
            </div>
            <div style={styles.btn} className="card-btn">
              <FiArrowRight />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
