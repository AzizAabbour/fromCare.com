import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const footerLinks = {
  platform: [
    { name: 'Modèles', path: '/vehicles' },
    { name: 'Hybride E-Tech', path: '/tracking' },
    { name: 'Offres & Financement', path: '/pricing' },
  ],
  company: [
    { name: 'Découvrir CareCaire', path: '/about' },
    { name: 'Contactez-nous', path: '/contact' },
    { name: 'Carrières', path: '#' },
    { name: 'Actualités', path: '#' },
  ],
  legal: [
    { name: 'Mentions Légales', path: '#' },
    { name: 'Données Personnelles', path: '#' },
    { name: 'Conditions Générales', path: '#' },
  ],
};

const socialLinks = [
  { icon: <FaXTwitter />, path: '#' },
  { icon: <FaInstagram />, path: '#' },
  { icon: <FaLinkedinIn />, path: '#' },
];

const styles = {
  footer: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '100px 0 40px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '60px',
    marginBottom: '80px',
  },
  brandCol: {
    gridColumn: 'span 2',
  },
  logo: {
    fontSize: '24px',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#ffffff',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '24px',
  },
  logoSub: {
    fontWeight: '300',
    opacity: 0.6,
  },
  brandDesc: {
    color: '#888888',
    fontSize: '15px',
    lineHeight: '1.7',
    maxWidth: '380px',
    marginBottom: '32px',
  },
  socials: {
    display: 'flex',
    gap: '16px',
  },
  socialBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  colTitle: {
    fontSize: '14px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '28px',
    color: '#ffffff',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  link: {
    color: '#888888',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease',
  },
  contactBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    padding: '40px 0',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    marginBottom: '40px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: '#888888',
  },
  contactIcon: {
    fontSize: '18px',
    color: '#005ce6',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    color: '#555555',
    fontSize: '12px',
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Main Content */}
        <div style={styles.mainGrid}>
          
          {/* Brand */}
          <div style={styles.brandCol}>
            <Link to="/" style={styles.logo}>
              CareCaire <span style={styles.logoSub}>E-Tech</span>
            </Link>
            <p style={styles.brandDesc}>
              L'avenir de la mobilité premium. Nous fusionnons luxe automobile et innovation technologique pour une expérience de location inégalée.
            </p>
            <div style={styles.socials}>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.path} style={styles.socialBtn}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#000000'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#ffffff'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={styles.colTitle}>Plateforme</h4>
            <ul style={styles.linkList}>
              {footerLinks.platform.map((l, i) => (
                <li key={i}><Link to={l.path} style={styles.link} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#888888'}>{l.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={styles.colTitle}>Société</h4>
            <ul style={styles.linkList}>
              {footerLinks.company.map((l, i) => (
                <li key={i}><Link to={l.path} style={styles.link} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#888888'}>{l.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={styles.colTitle}>Légal</h4>
            <ul style={styles.linkList}>
              {footerLinks.legal.map((l, i) => (
                <li key={i}><Link to={l.path} style={styles.link} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#888888'}>{l.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div style={styles.contactBar}>
          <div style={styles.contactItem}><FiMail style={styles.contactIcon} /> aziz.abour@icloud.com</div>
          <div style={styles.contactItem}><FiPhone style={styles.contactIcon} /> 0777996998</div>
          <div style={styles.contactItem}><FiMapPin style={styles.contactIcon} /> Casablanca, Maroc</div>
        </div>

        {/* Bottom */}
        <div style={styles.bottomBar}>
          <p>&copy; {currentYear} CareCaire E-Tech. Tous droits réservés.</p>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 4px 0' }}>By <span style={{ color: '#ffffff', fontWeight: '800' }}>CreoLab Web</span></p>
            <p style={{ margin: 0 }}>Design by <span style={{ color: '#ffffff', fontWeight: '800' }}>Aziz Aabbour</span></p>
          </div>
        </div>

      </div>
    </footer>
  );
}
