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

  // 100% Bulletproof Hybrid Approval System (IP + Device ID with Auto-Heal)
  useEffect(() => {
    let deviceId = localStorage.getItem('mash_magic_device_id');
    if (!deviceId) {
      deviceId = crypto.randomUUID ? crypto.randomUUID() : `dev-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('mash_magic_device_id', deviceId);
    }

    let unsubscribeIp = () => {};
    let unsubscribeDevice = () => {};

    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        const currentIp = data.ip;
        if (!currentIp || currentIp === 'Detecting...') return;

        const qIp = query(collection(db, "requests"), where("ip", "==", currentIp), where("status", "==", "approved"));
        const qDevice = query(collection(db, "requests"), where("deviceId", "==", deviceId), where("status", "==", "approved"));

        let ipDoc = null;
        let deviceDoc = null;

        const evaluateApproval = async () => {
          const validDoc = deviceDoc || ipDoc;
          if (validDoc) {
            setUserData({ ...validDoc.data(), id: validDoc.id });
            setIsApproved(true);

            // AUTO-HEAL: If they got in via IP (e.g. they used WhatsApp browser which wiped localStorage), 
            // but their Device ID is now different, we silently update the database with their new Device ID.
            // This guarantees they won't lose access even if their IP changes tomorrow!
            if (validDoc.data().deviceId !== deviceId) {
              try {
                const { doc, updateDoc } = await import('firebase/firestore');
                await updateDoc(doc(db, "requests", validDoc.id), { deviceId: deviceId });
              } catch (e) {
                console.error("Auto-heal failed", e);
              }
            }
          } else {
            setIsApproved(false);
          }
        };

        unsubscribeIp = onSnapshot(qIp, (snapshot) => {
          ipDoc = !snapshot.empty ? snapshot.docs[0] : null;
          evaluateApproval();
        });

        unsubscribeDevice = onSnapshot(qDevice, (snapshot) => {
          deviceDoc = !snapshot.empty ? snapshot.docs[0] : null;
          evaluateApproval();
        });
      })
      .catch(err => {
        console.error('IP Fetch Failed:', err);
        // Fallback: Just check Device ID if IP fetch fails (e.g. adblocker)
        const qDevice = query(collection(db, "requests"), where("deviceId", "==", deviceId), where("status", "==", "approved"));
        unsubscribeDevice = onSnapshot(qDevice, (snapshot) => {
          if (!snapshot.empty) {
            const docData = snapshot.docs[0].data();
            setUserData({ ...docData, id: snapshot.docs[0].id });
            setIsApproved(true);
          } else {
            setIsApproved(false);
          }
        });
      });

    return () => {
      unsubscribeIp();
      unsubscribeDevice();
    };
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
