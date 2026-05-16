import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEye, FiX, FiCalendar, FiCheck, FiClock } from 'react-icons/fi';

const initialReservations = [
  { id: 'R-001', client: 'Sarah Mitchell', email: 'sarah@email.com', vehicle: 'Mercedes-AMG GT', pickup: '2024-01-15', dropoff: '2024-01-18', status: 'Active', amount: 867, phone: '+212 600-111111' },
  { id: 'R-002', client: 'James Rodriguez', email: 'james@email.com', vehicle: 'Tesla Model S Plaid', pickup: '2024-01-14', dropoff: '2024-01-16', status: 'Completed', amount: 398, phone: '+212 600-222222' },
  { id: 'R-003', client: 'Emily Chen', email: 'emily@email.com', vehicle: 'BMW M4 Competition', pickup: '2024-01-16', dropoff: '2024-01-20', status: 'Pending', amount: 916, phone: '+212 600-333333' },
  { id: 'R-004', client: 'Mark Thompson', email: 'mark@email.com', vehicle: 'Porsche Cayenne Turbo', pickup: '2024-01-13', dropoff: '2024-01-15', status: 'Active', amount: 638, phone: '+212 600-444444' },
  { id: 'R-005', client: 'Lisa Wang', email: 'lisa@email.com', vehicle: 'Audi RS e-tron GT', pickup: '2024-01-12', dropoff: '2024-01-14', status: 'Completed', amount: 518, phone: '+212 600-555555' },
  { id: 'R-006', client: 'David Kim', email: 'david@email.com', vehicle: 'Range Rover Autobiography', pickup: '2024-01-17', dropoff: '2024-01-22', status: 'Pending', amount: 1745, phone: '+212 600-666666' },
  { id: 'R-007', client: 'Anna Brown', email: 'anna@email.com', vehicle: 'Lamborghini Huracán', pickup: '2024-01-18', dropoff: '2024-01-19', status: 'Active', amount: 499, phone: '+212 600-777777' },
];

const statusColors = { Active: 'text-emerald-400 bg-emerald-400/10', Completed: 'text-cyan-400 bg-cyan-400/10', Pending: 'text-amber-400 bg-amber-400/10', Cancelled: 'text-red-400 bg-red-400/10' };
const statusFilters = ['All', 'Active', 'Pending', 'Completed', 'Cancelled'];

export default function AdminReservations() {
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRes, setSelectedRes] = useState(null);

  const filtered = reservations.filter((r) => {
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchSearch = r.client.toLowerCase().includes(search.toLowerCase()) || r.vehicle.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const updateStatus = (id, status) => {
    setReservations(reservations.map((r) => r.id === id ? { ...r, status } : r));
    if (selectedRes?.id === id) setSelectedRes({ ...selectedRes, status });
  };

  const summaryCards = [
    { label: 'Total', value: reservations.length, icon: <FiCalendar />, color: 'cyan' },
    { label: 'Active', value: reservations.filter((r) => r.status === 'Active').length, icon: <FiCheck />, color: 'emerald' },
    { label: 'Pending', value: reservations.filter((r) => r.status === 'Pending').length, icon: <FiClock />, color: 'amber' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>Reservations</h1>
        <p className="text-white/40 text-sm">Manage all booking requests and active rentals.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {summaryCards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${c.color === 'cyan' ? 'text-cyan-400' : c.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`} style={{ background: `rgba(${c.color === 'cyan' ? '0,240,255' : c.color === 'emerald' ? '0,212,170' : '245,158,11'},0.08)` }}>{c.icon}</div>
            <div><p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>{c.value}</p><p className="text-white/40 text-xs">{c.label}</p></div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 max-w-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <FiSearch className="text-white/30" /><input type="text" placeholder="Search reservations..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${statusFilter === s ? 'text-white bg-cyan-500/15 border border-cyan-500/30' : 'text-white/40 border border-white/5'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-white/30 text-xs uppercase" style={{ fontFamily: 'var(--font-secondary)' }}>
            <th className="text-left py-4 px-5">ID</th><th className="text-left py-4 px-5">Client</th><th className="text-left py-4 px-5">Vehicle</th><th className="text-left py-4 px-5">Dates</th><th className="text-left py-4 px-5">Amount</th><th className="text-left py-4 px-5">Status</th><th className="text-right py-4 px-5">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-5 text-cyan-400 font-medium">{r.id}</td>
                <td className="py-3 px-5">{r.client}</td>
                <td className="py-3 px-5 text-white/60">{r.vehicle}</td>
                <td className="py-3 px-5 text-white/40 text-xs">{r.pickup} → {r.dropoff}</td>
                <td className="py-3 px-5 font-medium">${r.amount}</td>
                <td className="py-3 px-5"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[r.status] || ''}`}>{r.status}</span></td>
                <td className="py-3 px-5 text-right">
                  <button onClick={() => setSelectedRes(r)} className="p-2 rounded-lg text-white/40 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"><FiEye /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-10 text-white/30">No reservations found.</div>}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRes && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass-card-strong w-full max-w-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>Reservation {selectedRes.id}</h2>
                <button onClick={() => setSelectedRes(null)} className="text-white/40 hover:text-white"><FiX /></button>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between"><span className="text-white/40">Client</span><span className="font-medium">{selectedRes.client}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Email</span><span>{selectedRes.email}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Phone</span><span>{selectedRes.phone}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Vehicle</span><span>{selectedRes.vehicle}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Pickup</span><span>{selectedRes.pickup}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Dropoff</span><span>{selectedRes.dropoff}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Amount</span><span className="font-bold text-cyan-400">${selectedRes.amount}</span></div>
                <div className="flex justify-between items-center"><span className="text-white/40">Status</span><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[selectedRes.status]}`}>{selectedRes.status}</span></div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => { updateStatus(selectedRes.id, 'Completed'); }} className="glow-btn flex-1 !py-2.5 text-xs">Complete</button>
                <button onClick={() => { updateStatus(selectedRes.id, 'Cancelled'); }} className="flex-1 py-2.5 rounded-xl text-xs font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
