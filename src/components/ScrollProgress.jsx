import { useScrollProgress } from '../hooks/useAnimations';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[1001]" style={{ background: 'transparent' }}>
      <div
        className="h-full transition-all duration-150"
        style={{
          width: `${progress}%`,
          background: 'var(--gradient-main)',
          boxShadow: '0 0 10px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)',
        }}
      />
    </div>
  );
}
