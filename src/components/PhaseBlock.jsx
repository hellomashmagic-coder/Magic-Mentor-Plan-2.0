import React, { useState } from 'react';
import DayCard from './DayCard';

export default function PhaseBlock({ phase, accent, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ marginBottom: "16px", borderRadius: "12px", overflow: "hidden" }} className="fade-in">
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          background: "var(--bg-card)",
          borderTop: `1px solid ${open ? accent + "55" : "var(--border-color)"}`,
          borderRight: `1px solid ${open ? accent + "55" : "var(--border-color)"}`,
          borderLeft: `1px solid ${open ? accent + "55" : "var(--border-color)"}`,
          borderBottom: open ? `1px solid ${accent}22` : `1px solid ${open ? accent + "55" : "var(--border-color)"}`,
          borderRadius: open ? "12px 12px 0 0" : "12px",
          padding: "16px 20px",
          textAlign: "left",
          transition: "all var(--transition-fast)",
        }}
      >
        <div style={{
          background: "var(--bg-main)",
          border: `1px solid ${accent}44`,
          borderRadius: "8px",
          padding: "4px 14px",
          fontSize: "11px",
          fontWeight: 700,
          color: accent,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          boxShadow: `0 2px 6px ${accent}15`,
        }}>{phase.days}</div>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{phase.title}</span>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {phase.sessions.split(" · ").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </span>
        </div>

        <span style={{
          color: accent,
          fontSize: "14px",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          flexShrink: 0,
        }}>▶</span>
      </button>

      {open && (
        <div style={{
          background: "rgba(15, 17, 24, 0.4)",
          borderRight: `1px solid ${accent}33`,
          borderBottom: `1px solid ${accent}33`,
          borderLeft: `1px solid ${accent}33`,
          borderTop: "none",
          borderRadius: "0 0 12px 12px",
          padding: "20px",
        }} className="slide-down">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}>
            {phase.rows.map(row => <DayCard key={row.day} row={row} />)}
          </div>
          
          <div style={{
            background: "var(--bg-card)",
            borderLeft: `4px solid ${accent}`,
            borderRadius: "0 8px 8px 0",
            padding: "14px 18px",
            boxShadow: "var(--shadow-sm)",
          }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Phase Goal: </span>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)", marginLeft: "8px" }}>{phase.goal}</span>
          </div>
        </div>
      )}
    </div>
  );
}
