import React, { useState, useEffect, useRef } from 'react';
import './DepositModal.css';
import PayPalService from '../services/PayPalService';

function DepositModal({ isOpen, onClose, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];
  const paypalRef = useRef();

  // Optional fast direct PayPal link (set in env): if present we'll redirect there
  const DIRECT_LINK = process.env.REACT_APP_PAYPAL_DIRECT_LINK || '';

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
    if (!isOpen) return;

    // If direct link is configured we don't need to load PayPal SDK
    if (DIRECT_LINK) return;

    // Load PayPal SDK when modal opens (fallback orders API flow)
    const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';
    if (!clientId) {
      // If no client id and no direct link, show message
      if (!DIRECT_LINK) setError('PayPal client ID nuk është konfiguruar');
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
      renderPayPalButtons();
    }

    const containerRef = paypalRef.current;
    return () => {
      if (containerRef) containerRef.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, amount, DIRECT_LINK]);

  const renderPayPalButtons = () => {
    if (DIRECT_LINK) return; // don't render SDK buttons when using direct link

    const container = paypalRef.current;
    if (!container || !window.paypal) return;

    container.innerHTML = '';

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
      },
      onClick: function (data, actions) {
        const numAmount = parseFloat(amount);
        if (!numAmount || numAmount < 7) {
          setError('Minimum deposit is €7');
          return actions.reject();
        }
        setError('');
        return actions.resolve();
      },
      createOrder: async function () {
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

  const handleDirectPay = () => {
    if (!validateAmount()) return;
    // Build redirect URL — append amount as query param if the link accepts it
    const amountParam = parseFloat(amount).toFixed(2);
    const base = DIRECT_LINK;
    const sep = base.includes('?') ? '&' : '?';
    // try common param names amount and value
    // We'll first try amount param
    const urlWithAmount = `${base}${sep}amount=${encodeURIComponent(amountParam)}`;

    // Redirect user to PayPal link (note: if the PayPal link doesn't accept amount param it will ignore it)
    window.location.href = urlWithAmount;
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

        <div className="deposit-form">
          <div className="amount-section">
            <label className="label">Zgjidh Shumën (EUR)</label>

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

            {amount && (
              <div className="amount-info">
                <p className="total">Totali: <strong>€{parseFloat(amount).toFixed(2)}</strong></p>
                <p className="note">Nuk ka tarifa shtesë</p>
              </div>
            )}
          </div>

          {error && (
            <div className="error-message">⚠️ {error}</div>
          )}

          {/* If DIRECT_LINK is set, show fast redirect button */}
          {DIRECT_LINK ? (
            <div style={{ marginTop: 12 }}>
              <button
                type="button"
                className="btn-deposit"
                onClick={handleDirectPay}
                disabled={loading || !amount}
                style={{ width: '100%' }}
              >
                {loading ? 'Po përpunohet...' : 'Paguaj me PayPal'}
              </button>
              <p style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
                Do të ridrejtoheni te PayPal për të përfunduar pagesën.
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginTop: 12 }}>
                <div ref={paypalRef} id="paypal-button-container"></div>
              </div>
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
            </>
          )}

          <div className="security-info" style={{ marginTop: 12 }}>
            <p>🔒 Pagesa juaj është e siguruar me enkriptim SSL</p>
            <p>✓ Pagesat përpunohen nga PayPal</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepositModal;
