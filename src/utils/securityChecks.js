/**
 * Security Utility for Magic Mentor
 * Implements domain locking to prevent unauthorized hosting.
 */

const APPROVED_DOMAINS = [
  'localhost',
  '127.0.0.1',
  'magic-mentor-plan-2-0.vercel.app',
];

export function performSecurityAudit() {
  const currentHost = window.location.hostname;
  const isApproved = APPROVED_DOMAINS.some(domain => 
    currentHost === domain || currentHost.endsWith('.' + domain)
  );

  if (!isApproved) {
    document.body.innerHTML = `
      <div style="
        height: 100vh;
        background: #0d0f14;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: 'Syne', sans-serif;
        padding: 40px;
      ">
        <div>
          <h1 style="color: #ef4444; font-size: 40px; margin-bottom: 20px;">🛡️ SECURITY LOCK</h1>
          <p style="font-size: 18px; color: #9ca3af; margin-bottom: 30px;">
            This application is running on an unauthorized domain (<strong>${currentHost}</strong>).
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            This codebase is highly confidential and protected. Please contact the administrator for authorized access.
          </p>
        </div>
      </div>
    `;
    throw new Error('Unauthorized domain detected. Application locked.');
  }
}
