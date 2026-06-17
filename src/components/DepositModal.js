import React, { useState } from 'react';
import './DepositModal.css';
import PayseraService from '../services/PayseraService';

function DepositModal({ isOpen, onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
    setError('');
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    setAmount(value);
    setError('');
  };

  const validateAmount = () => {
    const numAmount = parseFloat(amount);
    if (!amount || numAmount <= 0) {
      setError('Shuma duhet të jetë më e madhe se 0');
      return false;
    }
    if (numAmount < 1) {
      setError('Shuma minimale është €1');
      return false;
    }
    if (numAmount > 10000) {
      setError('Shuma maksimale është €10,000');
      return false;
    }
    return true;
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    
    if (!validateAmount()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const orderId = `deposit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const result = await PayseraService.initializePayment(
        parseFloat(amount),
        'Depozito në Portofolin Polyshop',
        orderId,
        user.email || 'customer@polyshop.com'
      );

      if (result.redirectUrl) {
        // Redirect to Paysera payment page
        window.location.href = result.redirectUrl;
      } else {
        setError('Gabim gjatë përgatitjes së pagesës. Ju lutem provoni përsëri.');
      }
    } catch (err) {
      console.error('Deposit error:', err);
      setError('Gabim gjatë përgatitjes së pagesës. Kontrolloni lidhjen dhe provoni përsëri.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="deposit-overlay" onClick={onClose}></div>

      {/* Modal */}
      <div className="deposit-modal">
        <div className="modal-header">
          <h2>Depozito në Portofolin Tuaj</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleDeposit} className="deposit-form">
          {/* Payment Method Selection */}
          <div className="payment-methods">
            <label className="method-option">
              <input
                type="radio"
                name="method"
                value="card"
                checked={selectedMethod === 'card'}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />
              <span className="method-label">💳 Kartë Krediti/Debit</span>
            </label>
            <label className="method-option">
              <input
                type="radio"
                name="method"
                value="bank"
                checked={selectedMethod === 'bank'}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />
              <span className="method-label">🏦 Transferim Bankar</span>
            </label>
            <label className="method-option">
              <input
                type="radio"
                name="method"
                value="wallet"
                checked={selectedMethod === 'wallet'}
                onChange={(e) => setSelectedMethod(e.target.value)}
              />
              <span className="method-label">📱 E-Wallet</span>
            </label>
          </div>

          {/* Amount Section */}
          <div className="amount-section">
            <label className="label">Zgjidh Shumën (EUR)</label>
            
            {/* Quick Amount Buttons */}
            <div className="quick-amounts">
              {predefinedAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  className={`quick-btn ${amount === val.toString() ? 'active' : ''}`}
                  onClick={() => handleQuickAmount(val)}
                >
                  €{val}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="custom-amount">
              <span className="currency-symbol">€</span>
              <input
                type="number"
                placeholder="Shuma e përsonalizuar"
                value={amount}
                onChange={handleCustomAmount}
                step="0.01"
                min="1"
                max="10000"
                disabled={loading}
              />
            </div>

            {/* Amount Info */}
            {amount && (
              <div className="amount-info">
                <p className="total">Totali: <strong>€{parseFloat(amount).toFixed(2)}</strong></p>
                <p className="note">Nuk ka tarifa shtesë</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Anulo
            </button>
            <button
              type="submit"
              className="btn-deposit"
              disabled={loading || !amount}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Po përpunohet...
                </>
              ) : (
                '→ Vazhdo në Paysera'
              )}
            </button>
          </div>

          {/* Security Info */}
          <div className="security-info">
            <p>🔒 Pagesa juaj është e siguruar me enkriptim SSL</p>
            <p>✓ Paysera është partner i autorizuar në Europë</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default DepositModal;
