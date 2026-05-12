import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc, orderBy } from 'firebase/firestore';

export default function ManagerGate() {
  const [requests, setRequests] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple password check for the hidden portal
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'mashmagic2024') { // You can change this secret password
      setIsAuthenticated(true);
    } else {
      alert('Unauthorized access.');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "requests"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(reqList);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleApprove = async (request) => {
    try {
      await updateDoc(doc(db, "requests", request.id), {
        status: 'approved'
      });
      // Also add to a permanent approved_ips collection if needed
    } catch (err) {
      console.error("Error approving:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await deleteDoc(doc(db, "requests", id));
    } catch (err) {
      console.error("Error rejecting:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', background: '#0d1117', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleLogin} style={{ textAlign: 'center', background: '#1c1f26', padding: '40px', borderRadius: '16px', border: '1px solid #30363d' }}>
          <h2 style={{ color: '#fff', marginBottom: '24px' }}>Manager Login</h2>
          <input 
            type="password" 
            placeholder="Secret Key" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #30363d', background: '#0d1117', color: '#fff', width: '100%', marginBottom: '20px' }}
          />
          <button type="submit" style={{ background: '#238636', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#fff', marginBottom: '32px' }}>Access Requests Manager</h1>
        
        {requests.length === 0 ? (
          <p style={{ color: '#8b949e' }}>No pending requests.</p>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {requests.map(req => (
              <div key={req.id} style={{ 
                background: '#1c1f26', 
                padding: '24px', 
                borderRadius: '12px', 
                border: '1px solid #30363d',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: req.status === 'approved' ? 0.6 : 1
              }}>
                <div>
                  <h3 style={{ color: '#fff', marginBottom: '4px' }}>{req.name}</h3>
                  <p style={{ color: '#8b949e', fontSize: '14px' }}>{req.email}</p>
                  <p style={{ color: '#f6c90e', fontSize: '12px', marginTop: '4px' }}>IP: {req.ip}</p>
                  
                  {/* 🚨 VIOLATION TRACKER */}
                  <div style={{ 
                    marginTop: '12px', 
                    padding: '8px 12px', 
                    background: req.violationCount > 5 ? 'rgba(255,0,0,0.2)' : 'rgba(255,255,255,0.05)',
                    borderRadius: '6px',
                    border: `1px solid ${req.violationCount > 5 ? 'red' : '#30363d'}`
                  }}>
                    <span style={{ color: req.violationCount > 0 ? '#ff4d4d' : '#8b949e', fontSize: '12px', fontWeight: 'bold', display: 'block' }}>
                      📸 Capture Attempts: {req.violationCount || 0}
                    </span>
                    {req.lastViolationAt && (
                      <span style={{ color: '#8b949e', fontSize: '10px', marginTop: '4px', display: 'block' }}>
                        Last: {req.lastViolationAt.toDate().toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p style={{ color: req.status === 'approved' ? '#238636' : '#f6c90e', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginTop: '12px' }}>
                    Status: {req.status}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {req.status !== 'approved' && (
                    <button 
                      onClick={() => handleApprove(req)}
                      style={{ background: '#238636', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontWeight: 600 }}
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    onClick={() => handleReject(req.id)}
                    style={{ background: '#da3633', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontWeight: 600 }}
                  >
                    {req.status === 'approved' ? 'Revoke' : 'Reject'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
