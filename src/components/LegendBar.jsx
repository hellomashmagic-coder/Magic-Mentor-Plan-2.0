import React from 'react';
import { SESSION_META } from '../data/mentorData';

export default function LegendBar() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "16px",
      marginBottom: "32px",
    }}>
      {Object.entries(SESSION_META).map(([type, m]) => (
        <div key={type} style={{
          background: m.bg,
          border: `1px solid ${m.color}33`,
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          transition: "transform var(--transition-fast)",
          boxShadow: "var(--shadow-sm)",
        }} className="fade-in">
          <span style={{ fontSize: "24px", filter: `drop-shadow(0 0 8px ${m.color}44)` }}>{m.dot}</span>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: m.color, letterSpacing: "0.02em" }}>
              {m.label} · {m.mins}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px", lineHeight: 1.4 }}>
              {type === "Deep" ? "Root cause analysis · Detailed action plan · Intensive coaching" :
               type === "Medium" ? "Performance progress check · Strategy fine-tuning" :
               "Daily accountability · Early signal detection"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
