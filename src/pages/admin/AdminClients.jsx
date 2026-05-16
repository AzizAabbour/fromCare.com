import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEye, FiTrash2, FiX, FiMail, FiPhone, FiUsers } from 'react-icons/fi';

const initialClients = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah@email.com', phone: '+212 600-111111', rentals: 12, joined: '2023-06-15', status: 'Active', spent: 8540, avatar: 'SM' },
  { id: 2, name: 'James Rodriguez', email: 'james@email.com', phone: '+212 600-222222', rentals: 8, joined: '2023-08-20', status: 'Active', spent: 5230, avatar: 'JR' },
  { id: 3, name: 'Emily Chen', email: 'emily@email.com', phone: '+212 600-333333', rentals: 15, joined: '2023-03-10', status: 'Active', spent: 12800, avatar: 'EC' },
  { id: 4, name: 'Mark Thompson', email: 'mark@email.com', phone: '+212 600-444444', rentals: 3, joined: '2024-01-05', status: 'Inactive', spent: 1920, avatar: 'MT' },
  { id: 5, name: 'Lisa Wang', email: 'lisa@email.com', phone: '+212 600-555555', rentals: 6, joined: '2023-11-12', status: 'Active', spent: 3680, avatar: 'LW' },
  { id: 6, name: 'David Kim', email: 'david@email.com', phone: '+212 600-666666', rentals: 20, joined: '2022-12-01', status: 'VIP', spent: 24500, avatar: 'DK' },
  { id: 7, name: 'Anna Brown', email: 'anna@email.com', phone: '+212 600-777777', rentals: 9, joined: '2023-07-25', status: 'Active', spent: 6740, avatar: 'AB' },
  { id: 8, name: 'Omar Hassan', email: 'omar@email.com', phone: '+212 600-888888', rentals: 4, joined: '2023-10-18', status: 'Inactive', spent: 2100, avatar: 'OH' },
];

const statusColors = { Active: 'text-emerald-400 bg-emerald-400/10', Inactive: 'text-white/30 bg-white/5', VIP: 'text-amber-400 bg-amber-400/10' };

export default function AdminClients() {
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setClients(clients.filter((c) => c.id !== id));
    if (selectedClient?.id === id) setSelectedClient(null);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>Clients</h1>
          <p className="text-white/40 text-sm">Manage customer accounts and activity.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <FiUsers className="text-cyan-400" />
            <span className="text-sm font-bold">{clients.length}</span>
            <span className="text-white/40 text-xs">Total</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl max-w-sm mb-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <FiSearch className="text-white/30" />
        <input type="text" placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
            className="glass-card p-5 group cursor-pointer" onClick={() => setSelectedClient(c)}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: 'var(--gradient-main)' }}>{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{c.name}</p>
                <p className="text-white/40 text-xs truncate">{c.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-white/40">{c.rentals} rentals</span>
              <span className={`px-2 py-0.5 rounded-lg font-medium ${statusColors[c.status]}`}>{c.status}</span>
            </div>
            <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="text-white/40 text-xs">Total spent</span>
              <span className="font-bold text-sm gradient-text">${c.spent.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && <div className="text-center py-16 text-white/30">No clients found.</div>}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass-card-strong w-full max-w-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>Client Details</h2>
                <button onClick={() => setSelectedClient(null)} className="text-white/40 hover:text-white"><FiX /></button>
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl font-bold" style={{ background: 'var(--gradient-main)' }}>{selectedClient.avatar}</div>
                <h3 className="text-lg font-bold">{selectedClient.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-lg text-xs mt-2 ${statusColors[selectedClient.status]}`}>{selectedClient.status}</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-white/50"><FiMail className="text-cyan-400" />{selectedClient.email}</div>
                <div className="flex items-center gap-3 text-white/50"><FiPhone className="text-cyan-400" />{selectedClient.phone}</div>
                <div className="flex justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}><span className="text-white/40">Member since</span><span>{selectedClient.joined}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Total rentals</span><span className="font-bold">{selectedClient.rentals}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Total spent</span><span className="font-bold gradient-text">${selectedClient.spent.toLocaleString()}</span></div>
              </div>
              <div className="flex gap-2 mt-6">
                <button className="glow-btn flex-1 !py-2.5 text-xs"><FiMail /> Email</button>
                <button onClick={() => handleDelete(selectedClient.id)} className="flex-1 py-2.5 rounded-xl text-xs font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all"><FiTrash2 className="inline mr-1" />Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
