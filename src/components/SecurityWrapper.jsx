import React, { useEffect, useState } from 'react';

export default function SecurityWrapper({ children }) {
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    // 1. Disable Right-Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 2. Disable Screenshot Key Combinations
    const handleKeyDown = (e) => {
      // Disable Cmd+P (Print)
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        alert('Printing is disabled for security reasons.');
      }
      // Disable Cmd+S (Save)
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
      }
      // Detect PrtScn (though browser support is limited)
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText("");
        alert('Screenshots are prohibited.');
      }
    };

    // 3. Blur on Window Focus Loss
    const handleBlur = () => setIsSecure(false);
    const handleFocus = () => setIsSecure(true);
    const handleVisibilityChange = () => {
      if (document.hidden) setIsSecure(false);
      else setIsSecure(true);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Watermark Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.03,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        userSelect: 'none',
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            transform: 'rotate(-45deg)',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}>
            CONFIDENTIAL - HELLOMASHMAGIC
          </div>
        ))}
      </div>

      {/* Main Content with Blur deterrent */}
      <div style={{
        filter: isSecure ? 'none' : 'blur(20px)',
        transition: 'filter 0.3s ease',
        pointerEvents: isSecure ? 'auto' : 'none',
      }}>
        {children}
      </div>

      {/* Screen Overlay when blurred */}
      {!isSecure && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10000,
          background: 'rgba(13, 15, 20, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
        }}>
          <div>
            <h2 style={{ color: 'var(--accent-gold)', marginBottom: '10px', fontFamily: 'Syne' }}>SECURITY ALERT</h2>
            <p style={{ color: '#fff', fontSize: '14px' }}>Content hidden for security reasons. Please return to the window.</p>
          </div>
        </div>
      )}
    </div>
  );
}
