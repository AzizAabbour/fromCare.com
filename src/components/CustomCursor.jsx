import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateRing);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select, .interactive')) {
        setHovering(true);
      }
    };
    const handleHoverEnd = () => setHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);
    animateRing();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, []);

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
        style={{
          width: clicking ? '6px' : '8px',
          height: clicking ? '6px' : '8px',
          background: hovering ? 'var(--accent-cyan)' : '#fff',
          borderRadius: '50%',
          boxShadow: hovering ? '0 0 15px var(--accent-cyan)' : 'none',
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{
          width: hovering ? '50px' : clicking ? '25px' : '35px',
          height: hovering ? '50px' : clicking ? '25px' : '35px',
          border: `1.5px solid ${hovering ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.3)'}`,
          borderRadius: '50%',
          opacity: hovering ? 0.8 : 0.5,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
