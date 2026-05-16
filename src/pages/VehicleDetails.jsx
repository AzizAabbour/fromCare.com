import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiArrowLeft, FiCheck, FiZap, FiUsers, FiClock } from 'react-icons/fi';
import { BsFuelPump, BsSpeedometer2 } from 'react-icons/bs';
import { TbManualGearbox } from 'react-icons/tb';
import { HiOutlineSparkles } from 'react-icons/hi';
import VehicleCard from '../components/VehicleCard';
import { vehicles } from '../data/vehicles';

export default function VehicleDetails() {
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('specs');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', pickup: '', dropoff: '' });

  if (!vehicle) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Vehicle not found</h2>
          <Link to="/vehicles" className="glow-btn">Back to Fleet</Link>
        </div>
      </div>
    );
  }

  const similar = vehicles.filter((v) => v.category === vehicle.category && v.id !== vehicle.id).slice(0, 3);
  const specs = [
    { icon: <BsSpeedometer2 />, label: 'Top Speed', value: vehicle.speed },
    { icon: <FiZap />, label: 'Power', value: vehicle.power },
    { icon: <FiClock />, label: '0-100 km/h', value: vehicle.acceleration },
    { icon: <BsFuelPump />, label: 'Fuel', value: vehicle.fuel },
    { icon: <TbManualGearbox />, label: 'Transmission', value: vehicle.transmission },
    { icon: <FiUsers />, label: 'Seats', value: vehicle.seats },
  ];

  return (
    <div className="pt-28">
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/vehicles" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-8 text-sm"><FiArrowLeft /> Back to Fleet</Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="relative rounded-2xl overflow-hidden" style={{ background: 'rgba(15,25,50,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-[400px] object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: 'rgba(0,240,255,0.15)', border: '1px solid rgba(0,240,255,0.3)', color: 'var(--accent-cyan)' }}>{vehicle.category}</div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/40 text-sm">{vehicle.brand}</span>
                <div className="flex items-center gap-1 text-amber-400"><FiStar className="fill-current text-sm" /><span className="text-sm">{vehicle.rating}</span></div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-primary)' }}>{vehicle.name}</h1>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{vehicle.description}</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold gradient-text">${vehicle.price}</span>
                <span className="text-white/40">/day</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {['specs', 'features', 'booking'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? 'text-white' : 'text-white/40'}`} style={{ background: activeTab === tab ? 'rgba(0,240,255,0.1)' : 'transparent', border: `1px solid ${activeTab === tab ? 'rgba(0,240,255,0.2)' : 'transparent'}` }}>{tab}</button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {specs.map((s, i) => (
                    <div key={i} className="glass-card p-4 text-center">
                      <div className="text-cyan-400 text-xl mb-2 flex justify-center">{s.icon}</div>
                      <p className="text-white/40 text-xs mb-1">{s.label}</p>
                      <p className="font-bold text-sm">{s.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-3">
                  {vehicle.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm"><FiCheck className="text-cyan-400 flex-shrink-0" /><span className="text-white/60">{f}</span></div>
                  ))}
                </div>
              )}

              {activeTab === 'booking' && (
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" value={formData.pickup} onChange={(e) => setFormData({ ...formData, pickup: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <input type="date" value={formData.dropoff} onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                  </div>
                  <button className="glow-btn-solid w-full !py-3.5">Reserve Now</button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Similar */}
          {similar.length > 0 && (
            <div className="mt-24">
              <h2 className="section-title mb-8">Similar <span className="gradient-text">Vehicles</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{similar.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
