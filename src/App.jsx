import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ParticlesBackground from './components/ParticlesBackground';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Vehicles = lazy(() => import('./pages/Vehicles'));
const VehicleDetails = lazy(() => import('./pages/VehicleDetails'));
const Tracking = lazy(() => import('./pages/Tracking'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminVehicles = lazy(() => import('./pages/admin/AdminVehicles'));
const AdminReservations = lazy(() => import('./pages/admin/AdminReservations'));
const AdminClients = lazy(() => import('./pages/admin/AdminClients'));

import { pageReveal } from './utils/animations';

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: '24px', fontWeight: '900', color: '#005ce6', letterSpacing: '4px', textTransform: 'uppercase' }}
      >
        CareCaire
      </motion.div>
    </div>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageReveal}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuth = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <ScrollToTop />
      {!isAdmin && !isAuth && <Navbar />}
      {!isAdmin && <ScrollProgress />}
      
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {/* Public */}
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/vehicles" element={<PageTransition><Vehicles /></PageTransition>} />
            <Route path="/vehicles/:id" element={<PageTransition><VehicleDetails /></PageTransition>} />
            <Route path="/tracking" element={<PageTransition><Tracking /></PageTransition>} />
            <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="vehicles" element={<AdminVehicles />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="settings" element={<div className="text-center py-20"><h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-primary)' }}>Settings</h2><p className="text-white/40">Settings panel coming soon.</p></div>} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {!isAdmin && !isAuth && <Footer />}
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      <div className={`${loading ? 'hidden' : ''}`}>
        <div className="bg-gradient-animated" />
        <ParticlesBackground />
        <CustomCursor />
        <BackToTop />
        <AppRoutes />
      </div>
    </Router>
  );
}
