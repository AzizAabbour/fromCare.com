import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { HiOutlineSparkles } from 'react-icons/hi';
import { faqData } from '../data/vehicles';

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
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '80px',
  },
  infoCard: {
    padding: '40px 24px',
    background: '#ffffff',
    borderRadius: '24px',
    border: '1px solid rgba(0,0,0,0.05)',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
  },
  iconBox: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    margin: '0 auto 20px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: '#005ce6',
    background: 'rgba(0, 92, 230, 0.05)',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '60px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '16px',
    border: '1px solid rgba(0,0,0,0.1)',
    backgroundColor: '#f8f9fa',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    background: '#000000',
    color: '#ffffff',
    border: 'none',
    fontSize: '14px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  faqItem: (isOpen) => ({
    background: isOpen ? '#fcfcfc' : '#ffffff',
    border: `1px solid ${isOpen ? '#005ce6' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: '16px',
    marginBottom: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  }),
  faqBtn: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontWeight: '700',
    color: '#000000',
    fontSize: '15px',
  }
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const contactInfo = [
    { icon: <FiMail />, title: 'Email', value: 'aziz.abour@icloud.com' },
    { icon: <FiPhone />, title: 'Téléphone', value: '0777996998' },
    { icon: <FiMapPin />, title: 'Adresse', value: 'Casablanca, Maroc' },
  ];

  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <section style={{ padding: '80px 0' }}>
        <div style={styles.container}>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={styles.header}>
            <div style={styles.sectionLabel}><HiOutlineSparkles /> Contact</div>
            <h1 style={styles.title}>Restons en <span style={{ color: '#005ce6' }}>Contact</span></h1>
            <p style={styles.subtitle}>Des questions ? Notre équipe d'experts est là pour vous accompagner.</p>
          </motion.div>

          <div style={styles.contactGrid}>
            {contactInfo.map((info, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} style={styles.infoCard}>
                <div style={styles.iconBox}>{info.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '8px' }}>{info.title}</h3>
                <p style={{ color: '#666666', fontSize: '15px', margin: 0 }}>{info.value}</p>
              </motion.div>
            ))}
          </div>

          <div style={styles.mainContent}>
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '32px' }}>Envoyez un <span style={{ color: '#005ce6' }}>Message</span></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input 
                  type="text" 
                  placeholder="Votre Nom" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  style={styles.input} 
                  onFocus={(e) => e.target.style.borderColor = '#005ce6'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                />
                <input 
                  type="email" 
                  placeholder="Votre Email" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  style={styles.input} 
                  onFocus={(e) => e.target.style.borderColor = '#005ce6'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                />
                <textarea 
                  placeholder="Votre Message" 
                  rows={6} 
                  value={form.message} 
                  onChange={(e) => setForm({ ...form, message: e.target.value })} 
                  style={{ ...styles.input, resize: 'none' }} 
                  onFocus={(e) => e.target.style.borderColor = '#005ce6'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
                />
                <button style={styles.submitBtn} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Envoyer le Message <FiSend />
                </button>
              </div>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '40px' }}>
                {[<FaXTwitter />, <FaInstagram />, <FaLinkedinIn />].map((icon, i) => (
                  <a key={i} href="#" style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#666666', 
                    background: '#f8f9fa',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }} 
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#005ce6'; e.currentTarget.style.background = 'rgba(0, 92, 230, 0.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#666666'; e.currentTarget.style.background = '#f8f9fa'; }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ 
                height: '240px', 
                background: '#f8f9fa', 
                borderRadius: '32px', 
                marginBottom: '48px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <FiMapPin style={{ fontSize: '32px', color: '#005ce6', marginBottom: '12px' }} />
                  <p style={{ fontWeight: '800', margin: 0 }}>Casablanca, Maroc</p>
                  <p style={{ color: '#888888', fontSize: '13px', marginTop: '4px' }}>Siège Social CareCaire</p>
                </div>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '24px' }}>FAQ <span style={{ color: '#005ce6' }}>Rapide</span></h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {faqData.slice(0, 4).map((item, i) => (
                  <div key={i} style={styles.faqItem(openFaq === i)}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={styles.faqBtn}>
                      <span>{item.question}</span>
                      {openFaq === i ? <FiChevronUp style={{ color: '#005ce6' }} /> : <FiChevronDown style={{ color: '#888888' }} />}
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: '0 20px 20px 20px', fontSize: '14px', color: '#666666', lineHeight: '1.6' }}>
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
