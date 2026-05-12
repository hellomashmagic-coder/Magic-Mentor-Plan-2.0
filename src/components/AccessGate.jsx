import React, { useState, useEffect } from 'react';

export default function AccessGate({ onRequested }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ip, setIp] = useState('Detecting...');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp('Unable to detect IP'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      onRequested({ name, email, ip });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-main)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'var(--bg-card)',
        padding: '40px',
        borderRadius: '20px',
        border: '1px solid var(--border-color)',
        textAlign: 'center',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'var(--accent-gold)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '30px',
          boxShadow: '0 0 20px rgba(246, 201, 14, 0.3)',
        }}>🔒</div>

        <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#fff' }}>Access Required</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>
          This data is highly confidential. Please request access to proceed.
          <br/>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Detected IP: {ip}</span>
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              placeholder="Your Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                outline: 'none',
              }}
            />
            <input
              type="email"
              placeholder="Your Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px',
                borderRadius: '8px',
                background: 'var(--accent-gold)',
                color: 'var(--bg-main)',
                fontWeight: 700,
                marginTop: '10px',
                transition: 'all 0.2s',
              }}
            >
              Request Approval
            </button>
          </form>
        ) : (
          <div className="fade-in">
            <div style={{
              background: 'rgba(246, 201, 14, 0.1)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid rgba(246, 201, 14, 0.2)',
              marginBottom: '20px',
            }}>
              <p style={{ color: 'var(--accent-gold)', fontSize: '14px', fontWeight: 600 }}>
                Request Sent Successfully!
              </p>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
              An approval request has been sent to <strong>hellomashmagic@gmail.com</strong>. 
              Please wait for the administrator to approve your access.
            </p>
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Waiting for administrator...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
