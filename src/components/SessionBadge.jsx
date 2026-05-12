import React from 'react';
import { SESSION_META } from '../data/mentorData';

export default function SessionBadge({ type }) {
  const m = SESSION_META[type];
  if (!m) return null;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 12px",
      borderRadius: "20px",
      background: m.bg,
      border: `1px solid ${m.color}33`,
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.06em",
      color: m.color,
      textTransform: "uppercase",
      flexShrink: 0,
      boxShadow: `0 2px 8px ${m.color}10`,
    }}>
      <span>{m.dot}</span>
      <span>{m.label} · {m.mins}</span>
    </span>
  );
}
