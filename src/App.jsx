import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { db } from './firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { LEVELS } from './data/mentorData';
import LegendBar from './components/LegendBar';
import LevelPanel from './components/LevelPanel';
import SecurityWrapper from './components/SecurityWrapper';
import AccessGate from './components/AccessGate';
import ManagerGate from './components/ManagerGate';

export default function App() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [userData, setUserData] = useState(null);
  const [pendingRequest, setPendingRequest] = useState(null);

  // Strict Device-Locked Lifetime Approval
  useEffect(() => {
    let deviceId = localStorage.getItem('mash_magic_device_id');
    
    // If no device ID exists, we just let them stay unapproved and they will
    // be routed to AccessGate which will generate one when they request access.
    if (!deviceId) {
      setIsApproved(false);
      return;
    }

    const q = query(
      collection(db, "requests"), 
      where("deviceId", "==", deviceId), 
      where("status", "==", "approved")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        const docId = snapshot.docs[0].id;
        setUserData({ ...docData, id: docId });
        setIsApproved(true);
      } else {
        setIsApproved(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRequestAccess = (data) => {
    setPendingRequest(data);
  };

  const DashboardLayout = () => (
    <SecurityWrapper userData={userData}>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header style={{
          background: "rgba(13, 15, 20, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-color)",
          padding: "20px 0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "var(--shadow-sm)",
        }}>
          <div className="container" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent-gold)",
                  boxShadow: "0 0 12px var(--accent-gold)",
                  animation: "pulse-gold 2s infinite",
                }} />
                <span style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--accent-gold)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>Mash Magic Gold Mentorship</span>
              </div>
              <h1 style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
              }}>30-Day Mentor Execution Plan</h1>
            </div>

            {/* Level Tabs */}
            <nav style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {LEVELS.map((level, i) => (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(i)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 700,
                    transition: "all var(--transition-fast)",
                    background: activeLevel === i ? level.accent : "var(--bg-card)",
                    color: activeLevel === i ? "var(--bg-main)" : "var(--text-secondary)",
                    border: `1px solid ${activeLevel === i ? level.accent : "var(--border-color)"}`,
                    boxShadow: activeLevel === i ? `0 4px 15px ${level.accent}33` : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>{level.emoji}</span>
                  <span>{level.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "40px 0 80px" }}>
          <div className="container">
            <LegendBar />
            <LevelPanel key={activeLevel} level={LEVELS[activeLevel]} />
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          background: "var(--bg-card)",
          borderTop: "1px solid var(--border-color)",
          padding: "24px 0",
          marginTop: "auto",
        }}>
          <div className="container" style={{ textAlign: "center" }}>
            <p style={{
              fontSize: "14px",
              color: "var(--accent-gold)",
              fontStyle: "italic",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}>
              💎 "If the student improves genuinely, retention happens naturally." 
              <span style={{ display: "block", fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", fontStyle: "normal" }}>
                Every student must feel someone is truly monitoring their growth.
              </span>
            </p>
          </div>
        </footer>
      </div>
    </SecurityWrapper>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isApproved ? <DashboardLayout /> : <AccessGate onRequested={handleRequestAccess} />
        } />
        <Route path="/manager-access-gate" element={<ManagerGate />} />
      </Routes>
    </Router>
  );
}
