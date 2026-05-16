import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch, FiUpload } from 'react-icons/fi';
import { vehicles as initialVehicles, categories } from '../../data/vehicles';

export default function AdminVehicles() {
  const [vehicleList, setVehicleList] = useState(initialVehicles);
  const [showModal, setShowModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', brand: '', category: 'Luxury', price: '', fuel: 'Gasoline', transmission: 'Automatic', seats: '4', speed: '', power: '', available: true });

  const filtered = vehicleList.filter((v) => {
    const matchCat = filter === 'All' || v.category === filter;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => { setEditVehicle(null); setForm({ name: '', brand: '', category: 'Luxury', price: '', fuel: 'Gasoline', transmission: 'Automatic', seats: '4', speed: '', power: '', available: true }); setShowModal(true); };
  const openEdit = (v) => { setEditVehicle(v); setForm({ name: v.name, brand: v.brand, category: v.category, price: String(v.price), fuel: v.fuel, transmission: v.transmission, seats: String(v.seats), speed: v.speed, power: v.power, available: v.available }); setShowModal(true); };
  const handleDelete = (id) => setVehicleList(vehicleList.filter((v) => v.id !== id));
  const handleSave = () => {
    if (editVehicle) {
      setVehicleList(vehicleList.map((v) => v.id === editVehicle.id ? { ...v, ...form, price: Number(form.price), seats: Number(form.seats) } : v));
    } else {
      setVehicleList([...vehicleList, { ...form, id: Date.now(), price: Number(form.price), seats: Number(form.seats), rating: 4.5, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', acceleration: '4.0s', description: '', features: [], gallery: [], location: { lat: 33.57, lng: -7.59 } }]);
    }
    setShowModal(false);
  };

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>Vehicles</h1><p className="text-white/40 text-sm">Manage your fleet inventory.</p></div>
        <button onClick={openAdd} className="glow-btn-solid !py-3 !px-6 text-sm"><FiPlus /> Add Vehicle</button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 max-w-sm" style={inputStyle}>
          <FiSearch className="text-white/30" /><input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${filter === cat ? 'text-white bg-cyan-500/15 border border-cyan-500/30' : 'text-white/40 border border-white/5'}`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-white/30 text-xs uppercase" style={{ fontFamily: 'var(--font-secondary)' }}>
            <th className="text-left py-4 px-5">Vehicle</th><th className="text-left py-4 px-5">Category</th><th className="text-left py-4 px-5">Price</th><th className="text-left py-4 px-5">Fuel</th><th className="text-left py-4 px-5">Status</th><th className="text-right py-4 px-5">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-5"><div className="flex items-center gap-3"><img src={v.image} alt={v.name} className="w-12 h-9 rounded-lg object-cover" /><div><p className="font-medium">{v.name}</p><p className="text-white/40 text-xs">{v.brand}</p></div></div></td>
                <td className="py-3 px-5"><span className="px-2.5 py-1 rounded-lg text-xs bg-purple-500/10 text-purple-400">{v.category}</span></td>
                <td className="py-3 px-5 font-medium">${v.price}/day</td>
                <td className="py-3 px-5 text-white/50">{v.fuel}</td>
                <td className="py-3 px-5"><span className={`px-2.5 py-1 rounded-lg text-xs ${v.available ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{v.available ? 'Available' : 'Reserved'}</span></td>
                <td className="py-3 px-5 text-right">
                  <button onClick={() => openEdit(v)} className="p-2 rounded-lg text-white/40 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(v.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all ml-1"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-10 text-white/30">No vehicles found.</div>}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass-card-strong w-full max-w-lg p-8 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>{editVehicle ? 'Edit' : 'Add'} Vehicle</h2>
                <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><FiX /></button>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Vehicle Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={inputStyle} />
                <input type="text" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={inputStyle} />
                <div className="grid grid-cols-2 gap-4">
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white outline-none" style={inputStyle}>
                    {categories.filter((c) => c !== 'All').map((c) => <option key={c} value={c} className="bg-[#0a1128]">{c}</option>)}
                  </select>
                  <input type="number" placeholder="Price/day" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={inputStyle} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white outline-none" style={inputStyle}>
                    {['Gasoline', 'Electric', 'Hybrid', 'Diesel'].map((f) => <option key={f} value={f} className="bg-[#0a1128]">{f}</option>)}
                  </select>
                  <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white outline-none" style={inputStyle}>
                    {['Automatic', 'Manual'].map((t) => <option key={t} value={t} className="bg-[#0a1128]">{t}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" placeholder="Seats" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={inputStyle} />
                  <input type="text" placeholder="Speed" value={form.speed} onChange={(e) => setForm({ ...form, speed: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={inputStyle} />
                  <input type="text" placeholder="Power" value={form.power} onChange={(e) => setForm({ ...form, power: e.target.value })} className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none" style={inputStyle} />
                </div>
                {/* Image upload UI */}
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-cyan-500/30 transition-colors cursor-pointer">
                  <FiUpload className="text-2xl text-white/30 mx-auto mb-2" />
                  <p className="text-white/30 text-sm">Click to upload image</p>
                  <p className="text-white/20 text-xs mt-1">PNG, JPG up to 5MB</p>
                </div>
                <label className="flex items-center gap-2 text-sm text-white/60"><input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-cyan-400" /> Available for rental</label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="glow-btn flex-1 !py-3">Cancel</button>
                <button onClick={handleSave} className="glow-btn-solid flex-1 !py-3">{editVehicle ? 'Update' : 'Add'} Vehicle</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
