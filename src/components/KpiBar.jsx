import React from 'react';

export default function KpiBar({ kpis, accent }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginBottom: "32px",
    }}>
      {kpis.map(([num, label], i) => (
        <div key={i} style={{
          background: "var(--bg-card)",
          borderRight: `1px solid ${accent}22`,
          borderBottom: `1px solid ${accent}22`,
          borderLeft: `1px solid ${accent}22`,
          borderTop: `4px solid ${accent}`,
          borderRadius: "12px",
          padding: "20px 16px",
          textAlign: "center",
          transition: "transform var(--transition-fast)",
          boxShadow: "var(--shadow-md)",
        }} className="fade-in">
          <div style={{
            fontSize: "28px",
            fontWeight: 800,
            color: accent,
            fontFamily: "'Syne', sans-serif",
            lineHeight: 1,
            marginBottom: "8px",
          }}>{num}</div>
          <div style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>{label}</div>
        </div>
      ))}
    </div>
  );
}
