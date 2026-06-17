import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/PaymentPage.css';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentId = searchParams.get('paymentId');
        const orderId = searchParams.get('orderId');

        if (!paymentId) {
          throw new Error('Payment ID not found');
        }

        // Verify payment with backend
        const response = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentId, orderId }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setDetails(data);
          
          // Update user balance in localStorage
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.balance = data.newBalance;
          localStorage.setItem('user', JSON.stringify(user));

          // Redirect to home after 3 seconds
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          throw new Error(data.message || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setStatus('error');
        setError(err.message);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="payment-page">
      <div className="payment-container">
        {status === 'verifying' && (
          <div className="payment-state verifying">
            <div className="spinner-large"></div>
            <h2>Po verifikohet pagesa...</h2>
            <p>Ju lutem prisni ndërsa ne verifikojmë transaksionin tuaj</p>
          </div>
        )}

        {status === 'success' && (
          <div className="payment-state success">
            <div className="success-icon">✓</div>
            <h2>Depozito i Suksesshëm!</h2>
            <p className="success-message">Fonde janë shtuar në portofolin tuaj</p>
            
            {details && (
              <div className="payment-details">
                <div className="detail-row">
                  <span className="label">Shuma:</span>
                  <span className="value">€{(details.amount / 100).toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">ID Transaksioni:</span>
                  <span className="value">{details.transactionId}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Koha:</span>
                  <span className="value">{new Date(details.timestamp).toLocaleString('sq-AL')}</span>
                </div>
              </div>
            )}

            <p className="redirect-text">Duke u kthyer në shtëpi në 3 sekonda...</p>
            <button 
              className="btn-home"
              onClick={() => navigate('/')}
            >
              Kthehu në Shtëpi
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="payment-state error">
            <div className="error-icon">✕</div>
            <h2>Gabim në Pagesë</h2>
            <p className="error-message">{error}</p>
            
            <div className="error-actions">
              <button 
                className="btn-retry"
                onClick={() => navigate('/deposit')}
              >
                Provo Përsëri
              </button>
              <button 
                className="btn-home"
                onClick={() => navigate('/')}
              >
                Kthehu në Shtëpi
              </button>
            </div>

            <p className="support-text">
              Nëse problemi vazhdon, kontaktoni{' '}
              <a href="mailto:support@polyshop.com">support@polyshop.com</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;
