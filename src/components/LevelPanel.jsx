import React from 'react';
import KpiBar from './KpiBar';
import PhaseBlock from './PhaseBlock';

export default function LevelPanel({ level }) {
  return (
    <div className="fade-in">
      <div style={{
        background: `linear-gradient(135deg, ${level.accentBg} 0%, var(--bg-card) 100%)`,
        border: `1px solid ${level.accent}33`,
        borderRadius: "16px",
        padding: "24px 32px",
        marginBottom: "32px",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          right: "-20px",
          top: "-20px",
          fontSize: "120px",
          opacity: 0.05,
          pointerEvents: "none",
        }}>{level.emoji}</div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "40px", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))" }}>{level.emoji}</span>
          <div>
            <h2 style={{
              fontSize: "28px",
              fontWeight: 800,
              color: level.accent,
              marginBottom: "4px",
            }}>{level.label} — {level.subtitle}</h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontWeight: 500 }}>{level.tagline}</p>
          </div>
        </div>
      </div>
      
      <KpiBar kpis={level.kpis} accent={level.accent} />
      
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {level.phases.map((phase, i) => (
          <PhaseBlock key={i} phase={phase} accent={level.accent} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  );
}
