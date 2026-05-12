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
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      userSelect: 'none', 
      overflow: 'hidden', 
      background: '#0a0c10' 
    }}>
      
      {/* 🌫️ THE SECURITY LAYERS */}
      <div style={{
        filter: isSecure ? 'none' : 'blur(60px)',
        transition: 'filter 0.3s ease',
        minHeight: '100vh'
      }}>
        
        {/* Main Dashboard (Hidden by Mask) */}
        <div style={{
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}% ${mousePos.y}%, black 20%, transparent 100%)`,
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}% ${mousePos.y}%, black 20%, transparent 100%)`,
        }}>
          {children}
        </div>

        {/* Global Blur Overlay (This covers everything except the flashlight hole) */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5,
          pointerEvents: 'none',
          backdropFilter: 'blur(35px)',
          background: 'rgba(0,0,0,0.85)',
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}% ${mousePos.y}%, transparent 20%, black 100%)`,
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}% ${mousePos.y}%, transparent 20%, black 100%)`,
        }} />
      </div>

      {/* Instruction Tip */}
      <div style={{
        position: 'fixed',
        top: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10002,
        background: 'rgba(255,255,255,0.1)',
        padding: '5px 15px',
        borderRadius: '20px',
        fontSize: '11px',
        color: '#aaa',
        pointerEvents: 'none',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        Move finger/mouse to reveal content
      </div>

      {/* 🛡️ DYNAMIC WATERMARK */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        zIndex: 10003,
        pointerEvents: 'none',
        opacity: 0.3,
        color: '#fff',
        fontSize: '10px',
        padding: '4px 8px',
        borderRadius: '4px',
        background: 'rgba(255,0,0,0.2)'
      }}>
        CONFIDENTIAL | {userData?.email}
      </div>

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
            <h2 style={{ color: 'red' }}>SECURITY ACTIVE</h2>
            <p style={{ color: '#fff' }}>Please return to this window.</p>
          </div>
        </div>
      )}
    </div>
  );
}
