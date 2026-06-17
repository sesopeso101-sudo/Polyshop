import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/PaymentPage.css';

function PaymentFailure() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get('errorCode');
  const errorMessage = searchParams.get('errorMessage');

  const errorReasons = {
    'USER_CANCELLED': 'Ju anuluat transaksionin',
    'INSUFFICIENT_FUNDS': 'Fonde të pamjaftueshme në kartën tuaj',
    'CARD_DECLINED': 'Karta juaj u refuzua',
    'INVALID_CARD': 'Të dhënat e kartës nuk janë të vlefshme',
    'EXPIRED_CARD': 'Karta juaj ka skaduar',
    'SYSTEM_ERROR': 'Gabim sistem. Provoni përsëri më vonë',
  };

  const getReason = () => {
    return errorReasons[errorCode] || errorMessage || 'Pagesa nuk u arrit';
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-state error">
          <div className="error-icon">✕</div>
          <h2>Pagesa Refuzua</h2>
          <p className="error-message">{getReason()}</p>

          {errorCode && (
            <p className="error-code">Kodi: {errorCode}</p>
          )}

          <div className="error-actions">
            <button 
              className="btn-retry"
              onClick={() => window.history.back()}
            >
              🔄 Provo Përsëri
            </button>
            <button 
              className="btn-home"
              onClick={() => navigate('/')}
            >
              Kthehu në Shtëpi
            </button>
          </div>

          <div className="suggestions">
            <h3>Këshillime:</h3>
            <ul>
              <li>Kontrolloni të dhënat e kartës</li>
              <li>Sigurohuni se karta nuk ka skaduar</li>
              <li>Provoni me metodë alternative pagese</li>
              <li>Kontaktoni bankën tuaj nëse problemi vazhdon</li>
            </ul>
          </div>

          <p className="support-text">
            Keni nevojë për ndihmë? Kontaktoni{' '}
            <a href="mailto:support@polyshop.com">support@polyshop.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailure;
