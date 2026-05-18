import React, { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

export default function SecurityWrapper({ children, userData }) {
  const [isSecure, setIsSecure] = useState(true);
  const [watermarkPos, setWatermarkPos] = useState({ x: 10, y: 10 });
  const lastViolationTime = useRef(0);

  // 🛡️ Log Violation to Database
  const logViolation = async () => {
    const now = Date.now();
    // Reduced cooldown to 2 seconds for instant reporting
    if (userData?.id && now - lastViolationTime.current > 2000) {
      lastViolationTime.current = now;
      try {
        const userRef = doc(db, "requests", userData.id);
        await updateDoc(userRef, {
          violationCount: increment(1),
          lastViolationAt: new Date(),
          violationHistory: arrayUnion(new Date())
        });
        console.log("Security violation logged to database.");
      } catch (err) {
        console.error("Failed to log violation:", err);
      }
    }
  };

  useEffect(() => {
    if (!isSecure) {
      logViolation();
    }
  }, [isSecure]);

  useEffect(() => {
    // Basic protections against right-click and shortcuts
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'p' || e.key === 's' || e.key === 'c')) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    // Only trigger security breach if the tab is hidden, this avoids false positives
    // when clicking around or during normal app lag.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsSecure(false);
      } else {
        setIsSecure(true);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Keep the identity watermark moving slowly across the screen
    const watermarkInterval = setInterval(() => {
      setWatermarkPos({
        x: Math.random() * 80,
        y: Math.random() * 80
      });
    }, 5000);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(watermarkInterval);
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
        transition: 'all 5s linear',
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
