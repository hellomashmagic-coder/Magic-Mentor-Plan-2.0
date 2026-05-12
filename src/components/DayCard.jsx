import React, { useState } from 'react';
import { SESSION_META } from '../data/mentorData';
import SessionBadge from './SessionBadge';

export default function DayCard({ row }) {
  const m = SESSION_META[row.type];
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "var(--bg-card-hover)" : "var(--bg-card)",
        borderTop: `1px solid ${hover ? m.color + "55" : "var(--border-color)"}`,
        borderRight: `1px solid ${hover ? m.color + "55" : "var(--border-color)"}`,
        borderBottom: `1px solid ${hover ? m.color + "55" : "var(--border-color)"}`,
        borderLeft: `4px solid ${m.color}`,
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "all var(--transition-fast)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? `0 8px 24px ${m.color}20` : "none",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--bg-main)",
            border: `2px solid ${m.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 800,
            color: m.color,
            flexShrink: 0,
            boxShadow: `0 0 10px ${m.color}33`,
          }}>{row.day}</div>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>{row.title}</span>
        </div>
        <SessionBadge type={row.type} />
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
        {row.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: "10px", fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            <span style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "2px" }}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
