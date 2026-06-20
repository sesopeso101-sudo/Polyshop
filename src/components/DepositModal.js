import React, { useState, useEffect, useRef } from 'react';
import './DepositModal.css';
import PayPalService from '../services/PayPalService';

function DepositModal({ isOpen, onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];
  const paypalRef = useRef();

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
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Shuma duhet të jetë më e madhe se 0');
      return false;
    }
    if (numAmount < 7) {
      setError('Shuma minimale është €7');
      return false;
    }
    if (numAmount > 10000) {
      setError('Shuma maksimale është €10,000');
      return false;
    }
    return true;
  };

  useEffect(() => {
    // Load PayPal SDK when modal opens
    if (!isOpen) return;
    const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';
    if (!clientId) {
      setError('PayPal client ID nuk është konfiguruar');
      return;
    }

    const existing = document.getElementById('paypal-sdk');
    if (!existing) {
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
      script.async = true;
      script.onload = () => renderPayPalButtons();
      script.onerror = () => setError('Nuk mund të ngarkohet PayPal SDK');
      document.body.appendChild(script);
    } else {
      // SDK already present
      renderPayPalButtons();
    }

    // Capture the current container reference for cleanup
    const containerRef = paypalRef.current;
    return () => {
      if (containerRef) containerRef.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, amount]);

  const renderPayPalButtons = () => {
    // Ensure amount is valid before rendering a live button session
    const container = paypalRef.current;
    if (!container || !window.paypal) return;

    // Clear previous buttons
    container.innerHTML = '';

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
      },
      onClick: function (data, actions) {
        // Validate before allowing checkout
        const numAmount = parseFloat(amount);
        if (!numAmount || numAmount < 7) {
          setError('Minimum deposit is €7');
          return actions.reject();
        }
        setError('');
        return actions.resolve();
      },
      createOrder: async function () {
        // Ask backend to create an order and return PayPal order ID
        try {
          setLoading(true);
          if (!validateAmount()) throw new Error('Invalid amount');
          const res = await PayPalService.createOrder(parseFloat(amount));
          setLoading(false);
          if (!res || !res.id) throw new Error('Failed to create order');
          return res.id;
        } catch (err) {
          console.error('createOrder error', err);
          setLoading(false);
          setError('Nuk mund të krijohet porosia PayPal. Provoni përsëri.');
          throw err;
        }
      },
      onApprove: async function (data) {
        try {
          setLoading(true);
          const capture = await PayPalService.captureOrder(data.orderID);
          setLoading(false);
          const captureOk = Boolean(capture && (capture.status === 'COMPLETED' || capture.success));
          if (captureOk) {
            if (onSuccess) onSuccess(capture);
            onClose();
          } else {
            setError('Pagesa nuk u përfundua.');
          }
        } catch (err) {
          console.error('onApprove error', err);
          setLoading(false);
          setError('Gabim gjatë kapjes së pagesës.');
        }
      },
      onError: function (err) {
        console.error('PayPal Buttons error', err);
        setError('Gabim PayPal. Provoni përsëri.');
      }
    }).render(container);
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

        <div className="deposit-form">
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
                min="7"
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
            <div className="error-message">⚠️ {error}</div>
          )}

          {/* PayPal Button Container */}
          <div style={{ marginTop: 12 }}>
            <div ref={paypalRef} id="paypal-button-container"></div>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Anulo
            </button>

            <div style={{ flex: 1 }} />
          </div>

          {/* Security Info */}
          <div className="security-info">
            <p>🔒 Pagesa juaj është e siguruar me enkriptim SSL</p>
            <p>✓ Pagesat përpunohen nga PayPal</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepositModal;
