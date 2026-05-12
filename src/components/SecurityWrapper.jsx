import React, { useEffect, useState } from 'react';

export default function SecurityWrapper({ children, userData }) {
  const [isSecure, setIsSecure] = useState(true);
  const [watermarkPos, setWatermarkPos] = useState({ x: 10, y: 10 });

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'p' || e.key === 's' || e.key === 'c')) {
        e.preventDefault();
      }
    };

    // 🛡️ Super-Fast Security Heartbeat (Checks every 50ms)
    const securityCheck = () => {
      if (!document.hasFocus() || document.hidden) {
        setIsSecure(false);
      } else {
        setIsSecure(true);
      }
    };
    const heartbeat = setInterval(securityCheck, 50);

    const handleVisibilityChange = () => {
      if (document.hidden) setIsSecure(false);
    };

    // Fast-Moving Watermark for Identity Protection
    const moveWatermark = () => {
      setWatermarkPos({
        x: Math.random() * 65,
        y: Math.random() * 80
      });
    };
    const watermarkInterval = setInterval(moveWatermark, 1800); // Much faster

    window.addEventListener('contextmenu', (e) => e.preventDefault());
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'p' || e.key === 's' || e.key === 'c')) {
        e.preventDefault();
      }
    });
    window.addEventListener('blur', () => setIsSecure(false));
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) setIsSecure(false);
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(heartbeat);
      clearInterval(watermarkInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', userSelect: 'none', background: '#0a0c10' }}>
      
      {/* 🛡️ THE IDENTITY TRAP (Faster & More Visible) */}
      <div style={{
        position: 'fixed',
        top: `${watermarkPos.y}%`,
        left: `${watermarkPos.x}%`,
        zIndex: 10001,
        pointerEvents: 'none',
        opacity: 0.25,
        color: '#fff',
        fontSize: '15px',
        fontWeight: '900',
        background: 'rgba(255,0,0,0.6)',
        padding: '8px 16px',
        borderRadius: '6px',
        whiteSpace: 'nowrap',
        transition: 'all 1.5s linear',
        border: '2px solid #fff',
        boxShadow: '0 0 20px rgba(255,0,0,0.5)',
      }}>
        IDENTITY: {userData?.name} | {userData?.ip} | TRACED
      </div>

      {/* Main Content (Strict Removal) */}
      {isSecure ? (
        <div style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
          {children}
        </div>
      ) : (
        /* ⚪ THE AGGRESSIVE WHITE SCREEN */
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10005,
          background: '#FFFFFF', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'none'
        }}>
          <div style={{ padding: '40px', color: '#000' }}>
            <div style={{ fontSize: '100px', marginBottom: '20px' }}>🛑</div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1px' }}>SECURITY BREACH</h1>
            <p style={{ fontSize: '18px', fontWeight: 'bold', opacity: 0.7 }}>
              UNAUTHORIZED CAPTURE DETECTED. 
              <br/>THIS DEVICE HAS BEEN FLAGGED.
            </p>
            <p style={{ marginTop: '20px', fontSize: '12px', color: 'red' }}>
              IP: {userData?.ip} | DEVICE ID: {navigator.userAgent.slice(0, 20)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
