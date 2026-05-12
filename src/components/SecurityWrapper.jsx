import React, { useEffect, useState } from 'react';

export default function SecurityWrapper({ children, userData }) {
  const [isSecure, setIsSecure] = useState(true);
  const [watermarkPos, setWatermarkPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Disable Right-Click
    const handleContextMenu = (e) => e.preventDefault();

    // 2. Disable Keyboard Shortcuts
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'p' || e.key === 's' || e.key === 'c')) {
        e.preventDefault();
      }
    };

    // 3. Security Blur & Multi-Device Protection
    const handleBlur = () => setIsSecure(false);
    const handleFocus = () => setIsSecure(true);
    const handleVisibilityChange = () => {
      if (document.hidden) setIsSecure(false);
      else setIsSecure(true);
    };

    // 4. Mobile Gesture Detection
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        setIsSecure(false); // Blur if more than one finger (screenshot gesture)
        alert('Multi-touch gestures are restricted for security.');
      }
    };

    // 5. Dynamic Watermark Movement
    const moveWatermark = () => {
      setWatermarkPos({
        x: Math.random() * 80,
        y: Math.random() * 90
      });
    };
    const watermarkInterval = setInterval(moveWatermark, 4000);

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(watermarkInterval);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', userSelect: 'none', overflow: 'hidden' }}>
      
      {/* 🛡️ THE PERSONALIZED TRAP (Moving Watermark) */}
      <div style={{
        position: 'fixed',
        top: `${watermarkPos.y}%`,
        left: `${watermarkPos.x}%`,
        zIndex: 10001,
        pointerEvents: 'none',
        opacity: 0.15,
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        background: 'rgba(0,0,0,0.5)',
        padding: '5px 10px',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        transition: 'all 3.5s ease-in-out',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        USER: {userData?.name || 'Authorized Student'} | IP: {userData?.ip || 'Verified'} | 🛡️ CONFIDENTIAL
      </div>

      {/* Grid Deterrent (Makes photos look bad) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10000,
        pointerEvents: 'none',
        opacity: 0.02,
        background: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 2px)',
        backgroundSize: '100% 2px'
      }} />

      {/* Background Static Watermarks */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.08,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'space-around',
      }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ transform: 'rotate(-45deg)', fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>
            {userData?.email || 'MASH MAGIC'}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        filter: isSecure ? 'none' : 'blur(50px)',
        transition: 'filter 0.2s ease',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}>
        {children}
      </div>

      {/* Security Overlay */}
      {!isSecure && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10002,
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔐</div>
            <h2 style={{ color: 'var(--accent-gold)', marginBottom: '10px' }}>PROTECTED CONTENT</h2>
            <p style={{ color: '#fff', fontSize: '14px' }}>Capture attempt or focus loss detected.<br/>Unauthorized sharing is strictly tracked.</p>
          </div>
        </div>
      )}
    </div>
  );
}
