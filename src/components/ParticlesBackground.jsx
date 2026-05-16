import { useMemo } from 'react';

export default function ParticlesBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 15,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.3 + 0.05,
      color: i % 3 === 0 ? 'var(--accent-cyan)' : i % 3 === 1 ? 'var(--accent-purple)' : 'var(--accent-emerald)',
    }));
  }, []);

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
