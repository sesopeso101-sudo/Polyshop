import React from 'react';
import './Header.css';

const PAYPAL_DEPOSIT_URL = process.env.REACT_APP_PAYPAL_DEPOSIT_URL || 'https://www.paypal.com/ncp/payment/79WDAXCMA7L5S';

function Header({ purchaseType, setPurchaseType }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🛒</span>
            <h1 className="logo-text">Polyshop</h1>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Kërko produktet..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="header-right">
          <div className="purchase-toggle">
            <button
              className={`toggle-btn ${purchaseType === 'normal' ? 'active' : ''}`}
              onClick={() => setPurchaseType('normal')}
            >
              Blerje Normale
            </button>
            <button
              className={`toggle-btn ${purchaseType === 'wholesale' ? 'active' : ''}`}
              onClick={() => setPurchaseType('wholesale')}
            >
              Shumica
            </button>
          </div>

          <div className="wallet-and-deposit">
            <div className="wallet">
              <span className="wallet-label">Portofoli</span>
              <span className="wallet-amount">€0.01</span>
            </div>

            <div className="cash">
              <span className="cash-label">Para Likuide</span>
              <span className="cash-amount">€0.01</span>
            </div>

            {/* Deposit button: directly opens PayPal deposit URL */}
            <a
              href={PAYPAL_DEPOSIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="deposit-btn subtle"
              aria-label="Depozito - Shto Fonde"
              title="Depozito - Shto Fonde"
            >
              <span className="deposit-text">Depozito</span>
            </a>
          </div>

          <div className="user-menu">
            <span className="notifications">🔔</span>
            <span className="user-avatar">👤</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
