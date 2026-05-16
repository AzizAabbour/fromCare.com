import { motion } from 'framer-motion';
import { FiTruck, FiUsers, FiCalendar, FiDollarSign, FiTrendingUp, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const statsCards = [
  { title: 'Total Vehicles', value: '2,547', change: '+12%', up: true, icon: <FiTruck />, color: 'cyan' },
  { title: 'Active Clients', value: '15,342', change: '+8%', up: true, icon: <FiUsers />, color: 'purple' },
  { title: 'Reservations', value: '1,283', change: '+23%', up: true, icon: <FiCalendar />, color: 'emerald' },
  { title: 'Revenue', value: '$847K', change: '-3%', up: false, icon: <FiDollarSign />, color: 'cyan' },
];

const chartData = [
  { month: 'Jan', revenue: 4000, bookings: 240 }, { month: 'Feb', revenue: 3000, bookings: 198 },
  { month: 'Mar', revenue: 5000, bookings: 300 }, { month: 'Apr', revenue: 4500, bookings: 278 },
  { month: 'May', revenue: 6000, bookings: 389 }, { month: 'Jun', revenue: 5500, bookings: 349 },
  { month: 'Jul', revenue: 7000, bookings: 430 },
];

const recentReservations = [
  { id: '#R-001', client: 'Sarah M.', vehicle: 'Mercedes-AMG GT', date: '2024-01-15', status: 'Active', amount: '$578' },
  { id: '#R-002', client: 'James R.', vehicle: 'Tesla Model S', date: '2024-01-14', status: 'Completed', amount: '$398' },
  { id: '#R-003', client: 'Emily C.', vehicle: 'BMW M4', date: '2024-01-14', status: 'Pending', amount: '$458' },
  { id: '#R-004', client: 'Mark T.', vehicle: 'Porsche Cayenne', date: '2024-01-13', status: 'Active', amount: '$638' },
  { id: '#R-005', client: 'Lisa W.', vehicle: 'Audi RS e-tron', date: '2024-01-12', status: 'Completed', amount: '$518' },
];

const statusColors = { Active: 'text-emerald-400 bg-emerald-400/10', Completed: 'text-cyan-400 bg-cyan-400/10', Pending: 'text-amber-400 bg-amber-400/10' };

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-primary)' }}>Dashboard</h1>
        <p className="text-white/40 text-sm">Overview of your fleet management platform.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${card.color === 'cyan' ? 'text-cyan-400' : card.color === 'purple' ? 'text-purple-400' : 'text-emerald-400'}`} style={{ background: `rgba(${card.color === 'cyan' ? '0,240,255' : card.color === 'purple' ? '139,92,246' : '0,212,170'},0.08)` }}>{card.icon}</div>
              <span className={`text-xs font-medium flex items-center gap-1 ${card.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {card.up ? <FiArrowUpRight /> : <FiArrowDownRight />}{card.change}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-primary)' }}>{card.value}</p>
            <p className="text-white/40 text-xs mt-1">{card.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-primary)' }}>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs><linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} /><stop offset="95%" stopColor="#00f0ff" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,25,50,0.9)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="revenue" stroke="#00f0ff" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-primary)' }}>Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(15,25,50,0.9)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="bookings" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
              <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} /></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Reservations */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <h3 className="font-bold mb-4" style={{ fontFamily: 'var(--font-primary)' }}>Recent Reservations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-white/30 text-xs uppercase" style={{ fontFamily: 'var(--font-secondary)' }}>
              <th className="text-left py-3 px-4">ID</th><th className="text-left py-3 px-4">Client</th><th className="text-left py-3 px-4">Vehicle</th><th className="text-left py-3 px-4">Date</th><th className="text-left py-3 px-4">Status</th><th className="text-right py-3 px-4">Amount</th>
            </tr></thead>
            <tbody>
              {recentReservations.map((r, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-cyan-400 font-medium">{r.id}</td>
                  <td className="py-3 px-4">{r.client}</td>
                  <td className="py-3 px-4 text-white/60">{r.vehicle}</td>
                  <td className="py-3 px-4 text-white/40">{r.date}</td>
                  <td className="py-3 px-4"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[r.status]}`}>{r.status}</span></td>
                  <td className="py-3 px-4 text-right font-medium">{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
