import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiCarLine, RiDashboardLine } from 'react-icons/ri';
import { FiUsers, FiCalendar, FiTruck, FiSettings, FiBell, FiMenu, FiX, FiSearch, FiLogOut } from 'react-icons/fi';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: <RiDashboardLine /> },
  { name: 'Vehicles', path: '/admin/vehicles', icon: <FiTruck /> },
  { name: 'Reservations', path: '/admin/reservations', icon: <FiCalendar /> },
  { name: 'Clients', path: '/admin/clients', icon: <FiUsers /> },
  { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-[100] w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ background: 'rgba(10,17,40,0.95)', borderRight: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center"><RiCarLine className="text-white" /></div>
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-primary)' }}>Care<span className="gradient-text">Caire</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/40"><FiX /></button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                style={{ background: active ? 'rgba(0,240,255,0.08)' : 'transparent', border: active ? '1px solid rgba(0,240,255,0.15)' : '1px solid transparent' }}>
                <span className={active ? 'text-cyan-400' : ''}>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 m-4 rounded-xl text-center" style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.1)' }}>
          <p className="text-xs text-white/40 mb-1">Created by</p>
          <p className="text-xs text-cyan-400 font-medium">CreoLab Web</p>
          <p className="text-xs text-purple-400">Aziz Aabbour</p>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-[99] lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: 'rgba(5,10,21,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60"><FiMenu className="text-xl" /></button>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <FiSearch className="text-white/30" />
              <input type="text" placeholder="Search..." className="bg-transparent text-sm text-white placeholder-white/30 outline-none w-48" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <FiBell />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] flex items-center justify-center text-white font-bold">3</span>
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: 'var(--gradient-main)' }}>AA</div>
          </div>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
