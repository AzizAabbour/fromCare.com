import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { RiCarLine } from 'react-icons/ri';

const navLinks = [
  { name: 'Modèles', path: '/vehicles' },
  { name: 'Hybride E-Tech', path: '/tracking' },
  { name: 'Offres', path: '/pricing' },
  { name: 'Découvrir', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Style calculation
  const isHome = location.pathname === '/';
  
  // Always White Background with Glassmorphism for clarity
  const navBg = 'rgba(255, 255, 255, 0.95)';
  const textColor = '#000000';
  const backdropFilter = 'blur(15px)';
  const borderBottom = scrolled ? '1px solid rgba(0,0,0,0.1)' : 'none';
  const shadow = scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none';
  const padding = scrolled ? '12px 0' : '18px 0';

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: navBg,
      backdropFilter: backdropFilter,
      borderBottom: borderBottom,
      boxShadow: shadow,
      padding: padding,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
      color: textColor,
      transition: 'color 0.4s',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    logoSubtext: {
      fontWeight: '300',
      opacity: 0.7,
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '40px',
    },
    link: {
      position: 'relative',
      fontSize: '12px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textDecoration: 'none',
      color: textColor,
      transition: 'all 0.4s',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
    },
    loginBtn: {
      fontSize: '12px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textDecoration: 'none',
      color: textColor,
      transition: 'opacity 0.3s',
    },
    ctaBtn: {
      padding: '12px 32px',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontSize: '11px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textDecoration: 'none',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      border: 'none',
      borderRadius: '2px',
    }
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div className="container" style={styles.container}>
          
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            <span style={styles.logoText}>CareCaire <span style={styles.logoSubtext}>E-Tech</span></span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'none' }} className="lg:flex items-center gap-8">
            <style>{`
              @media (min-width: 1024px) {
                .desktop-nav { display: flex !important; }
              }
            `}</style>
            <div className="desktop-nav" style={styles.navLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    ...styles.link,
                    color: location.pathname === link.path ? '#005ce6' : textColor,
                    opacity: location.pathname === link.path ? 1 : 0.8
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#005ce6'; e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.color = location.pathname === link.path ? '#005ce6' : textColor;
                    e.currentTarget.style.opacity = location.pathname === link.path ? '1' : '0.8';
                  }}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navIndicator"
                      style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '2px', backgroundColor: '#005ce6' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '32px' }}>
            <Link 
              to="/login" 
              style={styles.loginBtn}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              Connexion
            </Link>
            <Link 
              to="/vehicles" 
              style={styles.ctaBtn}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = scrolled ? 'none' : '0 10px 20px rgba(0,0,0,0.1)';
              }}
            >
              Configurer
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'block', background: 'none', border: 'none', color: textColor, fontSize: '28px', cursor: 'pointer' }}
            className="lg:hidden"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 999, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'center' }}>
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.path} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <Link 
                    to={link.path} 
                    style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', color: '#000000', textDecoration: 'none', letterSpacing: '-1px' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5 }} 
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px', alignItems: 'center' }}
              >
                <Link 
                  to="/login" 
                  style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: '#000000', textDecoration: 'none', letterSpacing: '2px' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/vehicles" 
                  style={{ ...styles.ctaBtn, textAlign: 'center', width: '240px', border: 'none' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Configurer
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
