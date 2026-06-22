import React, { useEffect } from 'react';

// Keep the exact deposit anchor (text and attributes) unchanged.
const PAYPAL_DEPOSIT_URL = process.env.REACT_APP_PAYPAL_DEPOSIT_URL || 'https://www.paypal.com/ncp/payment/79WDAXCMA7L5S';

function Header() {
  // Ensure page background is white. This does not wrap or modify the deposit anchor.
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#ffffff';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <a
      href={PAYPAL_DEPOSIT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="deposit-btn primary"
      aria-label="Depozito - Shto Fonde"
      title="Depozito - Shto Fonde"
    >
      <span className="deposit-icon" aria-hidden>
        {/* Download/Deposit SVG icon (kept as before) */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 3v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 20h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span className="deposit-text">Depozito</span>
    </a>
  );
}

export default Header;
