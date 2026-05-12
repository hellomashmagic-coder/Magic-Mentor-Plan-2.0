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
    <div style={{ position: 'relative', minHeight: '100vh', userSelect: 'none' }}>
      {/* Watermark Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.1, // Increased visibility
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        userSelect: 'none',
      }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{
            transform: 'rotate(-45deg)',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
            whiteSpace: 'nowrap',
            padding: '20px',
          }}>
            CONFIDENTIAL - {new Date().toLocaleDateString()} - HELLOMASHMAGIC
          </div>
        ))}
      </div>

      {/* Main Content with Blur deterrent */}
      <div style={{
        filter: isSecure ? 'none' : 'blur(40px)', // Increased blur depth
        transition: 'filter 0.2s ease',
        pointerEvents: isSecure ? 'auto' : 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
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
          background: '#0d0f14',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
        }}>
          <div>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>🛡️</div>
            <h2 style={{ color: 'var(--accent-gold)', marginBottom: '10px', fontFamily: 'Syne', letterSpacing: '2px' }}>SECURITY LOCK ACTIVE</h2>
            <p style={{ color: '#fff', fontSize: '14px', opacity: 0.8 }}>
              Content hidden to prevent unauthorized capture. 
              <br/>Please return to the window to resume.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
