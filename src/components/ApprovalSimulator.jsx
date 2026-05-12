import React from 'react';

export default function ApprovalSimulator({ request, onApprove, onReject }) {
  if (!request) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 10001,
      background: '#1c1f26',
      border: '1px solid #30363d',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      width: '320px',
      animation: 'slideUp 0.3s ease',
    }}>
      <h3 style={{ fontSize: '14px', color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#f6c90e' }}>📧</span> Admin: New Access Request
      </h3>
      <div style={{ background: '#0d1117', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
        <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>From: <strong>{request.name}</strong></p>
        <p style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Email: {request.email}</p>
        <p style={{ fontSize: '12px', color: '#f6c90e' }}>IP: {request.ip}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <button
          onClick={onReject}
          style={{
            padding: '8px',
            borderRadius: '6px',
            background: '#30363d',
            color: '#f85149',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Reject
        </button>
        <button
          onClick={onApprove}
          style={{
            padding: '8px',
            borderRadius: '6px',
            background: '#238636',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Approve
        </button>
      </div>
      <p style={{ fontSize: '10px', color: '#484f58', marginTop: '12px', textAlign: 'center' }}>
        *This panel simulates the email buttons sent to hellomashmagic@gmail.com
      </p>
    </div>
  );
}
