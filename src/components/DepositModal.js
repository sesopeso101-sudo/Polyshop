import React, { useState } from 'react';
import './DepositModal.css';
import PayPalService from '../services/PayPalService';

function DepositModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const quick = [5,10,25,50,100,250];

  const validate = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setError('Shuma duhet të jetë më e madhe se 0');
      return false;
    }
    if (num < 1) {
      setError('Shuma minimale është €1');
      return false;
    }
    if (num > 10000) {
      setError('Shuma maksimale është €10,000');
      return false;
    }
    return true;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await PayPalService.createOrder(parseFloat(amount));
      if (result && result.approvalUrl) {
        // redirect to PayPal approval
        window.location.href = result.approvalUrl;
      } else {
        setError('Gabim gjatë krijimit të pagesës. Ju lutem provoni përsëri.');
      }
    } catch (err) {
      console.error('Create order error:', err);
      setError(err.message || 'Gabim gjatë krijimit të pagesës');
    } finally {
      setLoading(false);
    }
  };

  const handleQuick = (v) => {
    setAmount(v.toString());
    setError('');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="deposit-overlay" onClick={onClose}></div>
      <div className="deposit-modal">
        <div className="modal-header">
          <h2>Depozito në Portofolin Tuaj</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form className="deposit-form" onSubmit={handleCreate}>
          <label>Shuma (€)</label>
          <input
            className="amount-input"
            type="number"
            step="0.01"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="P.sh. 25.00"
          />

          <div className="quick-amounts">
            {quick.map((q) => (
              <button type="button" key={q} onClick={() => handleQuick(q)}>€{q}</button>
            ))}
          </div>

          {error && <div style={{color:'red'}}>{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Anulo</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Duke përpunuar...' : 'Vazhdo tek PayPal'}</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DepositModal;
