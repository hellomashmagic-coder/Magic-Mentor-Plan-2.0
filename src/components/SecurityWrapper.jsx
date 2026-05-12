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

    // 🛡️ Hyper-Sensitive Whiteout Logic
    const handleSecurityLock = () => setIsSecure(false);
    const handleSecurityUnlock = () => setIsSecure(true);

    const handleVisibilityChange = () => {
      if (document.hidden) handleSecurityLock();
      else handleSecurityUnlock();
    };

    // Moving Watermark for Identity Protection
    const moveWatermark = () => {
      setWatermarkPos({
        x: Math.random() * 70,
        y: Math.random() * 85
      });
    };
    const interval = setInterval(moveWatermark, 3000);

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleSecurityLock);
    window.addEventListener('focus', handleSecurityUnlock);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleSecurityLock);
      window.removeEventListener('focus', handleSecurityUnlock);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', userSelect: 'none', background: '#0a0c10' }}>
      
      {/* 🛡️ THE IDENTITY TRAP (Moves across screen) */}
      <div style={{
        position: 'fixed',
        top: `${watermarkPos.y}%`,
        left: `${watermarkPos.x}%`,
        zIndex: 10001,
        pointerEvents: 'none',
        opacity: 0.15,
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        background: 'rgba(255,0,0,0.4)',
        padding: '6px 12px',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        transition: 'all 2.8s ease-in-out',
        border: '1px solid rgba(255,255,255,0.3)',
      }}>
        AUTHORIZED TO: {userData?.name || 'STUDENT'} | IP: {userData?.ip} | DO NOT SHARE
      </div>

      {/* Main Content */}
      <div style={{
        visibility: isSecure ? 'visible' : 'hidden',
        opacity: isSecure ? 1 : 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}>
        {children}
      </div>

      {/* ⚪ THE WHITE SCREEN PROTECTION */}
      {!isSecure && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10005,
          background: '#FFFFFF', // PURE WHITE SCREEN
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <div style={{ padding: '40px' }}>
            <h1 style={{ color: '#000', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>SECURITY ALERT</h1>
            <p style={{ color: '#333', fontSize: '16px' }}>
              Screen capture or focus loss detected. 
              <br/>This attempt has been recorded for your IP.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
