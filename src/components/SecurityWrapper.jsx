import React, { useEffect, useState } from 'react';

export default function SecurityWrapper({ children, userData }) {
  const [isSecure, setIsSecure] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'p' || e.key === 's' || e.key === 'c')) {
        e.preventDefault();
      }
    };

    const handleBlur = () => setIsSecure(false);
    const handleFocus = () => setIsSecure(true);
    const handleVisibilityChange = () => {
      if (document.hidden) setIsSecure(false);
      else setIsSecure(true);
    };

    // Tracking for Flashlight Effect (Mouse & Touch)
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setMousePos({ 
        x: (clientX / window.innerWidth) * 100, 
        y: (clientY / window.innerHeight) * 100 
      });
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', userSelect: 'none', overflow: 'hidden', background: '#000' }}>
      
      {/* 🌫️ THE FLASHLIGHT CONTAINER */}
      <div style={{
        filter: isSecure ? 'none' : 'blur(80px)',
        transition: 'filter 0.3s ease',
      }}>
        
        {/* Transparent Mask Layer (Only clear in a circle) */}
        <div style={{
          WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 100px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
          background: 'inherit',
        }}>
          {children}
        </div>

        {/* Blurred Backup Layer (Hides everything else) */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5,
          pointerEvents: 'none',
          backdropFilter: 'blur(45px)',
          background: 'rgba(0,0,0,0.6)',
        }} />
      </div>

      {/* 🛡️ THE PERSONALIZED TRAP (Floating Info) */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 10001,
        pointerEvents: 'none',
        opacity: 0.5,
        color: 'red',
        fontSize: '10px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        TRACKED SESSION: {userData?.email} | IP: {userData?.ip}
      </div>

      {/* Digital Noise Deterrent (Anti-Photo) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10000,
        pointerEvents: 'none',
        opacity: 0.03,
        backgroundImage: 'url("https://media.giphy.com/media/oEI9uWU7AT9qo/giphy.gif")',
      }} />

      {/* Security Lockout Screen */}
      {!isSecure && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10005,
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔐</div>
            <h2 style={{ color: 'red', letterSpacing: '4px' }}>SECURITY BREACH</h2>
            <p style={{ color: '#fff' }}>Unauthorized capture attempt detected.<br/>Access has been suspended for this session.</p>
          </div>
        </div>
      )}
    </div>
  );
}
