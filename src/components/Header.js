import React, { useState } from 'react';
import './Header.css';
import DepositModal from './DepositModal';

function Header({ purchaseType, setPurchaseType }) {
  const [isDepositOpen, setIsDepositOpen] = useState(false);

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

            {/* Prominent Deposit button - primary action */}
            <button
              className="deposit-btn"
              onClick={() => setIsDepositOpen(true)}
              aria-label="Depozito - Shto Fonde"
              title="Depozito - Shto Fonde"
            >
              <span className="deposit-icon" aria-hidden>💰</span>
              <span className="deposit-text">Depozito</span>
              <span className="deposit-badge">Shto Fonde</span>
            </button>
          </div>

          <div className="user-menu">
            <span className="notifications">🔔</span>
            <span className="user-avatar">👤</span>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />
    </header>
  );
}

export default Header;
