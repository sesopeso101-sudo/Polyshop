# Paysera Payment Integration Guide

## Overview
This guide provides complete instructions for integrating Paysera payments into your Polyshop marketplace.

## Prerequisites
- ✅ Paysera business account (confirmed)
- Node.js backend server
- Environment variables configured

## Setup Instructions

### 1. Get Your Paysera Credentials

1. Log in to your Paysera dashboard
2. Navigate to **Settings** → **API Access**
3. Copy your:
   - **Project ID** (also called Client ID)
   - **Password** (API password)
   - **API Signature Key**

### 2. Frontend Configuration

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your Paysera credentials:
```env
REACT_APP_PAYSERA_PROJECT_ID=your_actual_project_id
REACT_APP_PAYSERA_API_URL=https://www.paysera.com/api/v1
REACT_APP_API_ENDPOINT=http://localhost:3001
```

### 3. Update Header Component

Update your `src/components/Header.js` to use the deposit modal:

```javascript
import React, { useState } from 'react';
import DepositModal from './DepositModal';
import './Header.css';

function Header({ purchaseType, setPurchaseType }) {
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  return (
    <header className="header">
      {/* ... existing header code ... */}
      
      <button 
        className="deposit-btn"
        onClick={() => setIsDepositOpen(true)}
      >
        Depozito
      </button>

      <DepositModal 
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />
    </header>
  );
}

export default Header;
```

### 4. Backend Setup

Create a backend route handler for payment initialization:

**Example with Express.js:**

```javascript
// routes/payments.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const PAYSERA_API_URL = 'https://www.paysera.com/api/v1';
const PROJECT_ID = process.env.PAYSERA_PROJECT_ID;
const PASSWORD = process.env.PAYSERA_PASSWORD;

// Initialize Payment
router.post('/initialize', async (req, res) => {
  try {
    const { amount, currency, description, orderId, email, successUrl, failureUrl, callbackUrl } = req.body;

    // Prepare payment data
    const paymentData = {
      projectid: PROJECT_ID,
      orderid: orderId,
      amount: amount, // in cents
      currency: currency,
      accepturl: successUrl,
      cancelurl: failureUrl,
      callbackurl: callbackUrl,
      lang: 'en',
      p_email: email,
      p_street: '',
      p_city: '',
      p_state: '',
      p_zip: '',
      p_countrycode: 'AL',
      test: process.env.NODE_ENV === 'development' ? 1 : 0,
    };

    // Create signature
    const signature = generateSignature(paymentData);
    paymentData.sign = signature;

    // Redirect URL
    const queryString = new URLSearchParams(paymentData).toString();
    const redirectUrl = `${PAYSERA_API_URL}/payment?${queryString}`;

    res.json({
      success: true,
      redirectUrl: redirectUrl,
      orderId: orderId,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Verify Payment
router.post('/verify/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, amount } = req.body;

    // Verify with Paysera API (implement verification logic)
    // Update user wallet in database
    
    res.json({
      success: true,
      amount: amount / 100, // Convert cents to EUR
      transactionId: paymentId,
      newBalance: userNewBalance,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Helper function to generate signature
function generateSignature(data) {
  const message = [
    data.projectid,
    data.orderid,
    data.amount,
    data.currency,
    data.accepturl,
    data.cancelurl,
    data.callbackurl,
  ].join(';');

  return crypto
    .createHash('md5')
    .update(message + ';' + PASSWORD)
    .digest('hex');
}

module.exports = router;
```

### 5. Configure Routes

Add these routes to your React app (`src/App.js` or routing file):

```javascript
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';

// In your routing configuration:
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-failure" element={<PaymentFailure />} />
```

### 6. Database Schema (Example)

Add payment tracking to your user model:

```sql
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(20) DEFAULT 'pending',
  paysera_transaction_id VARCHAR(255),
  order_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE users ADD COLUMN wallet_balance DECIMAL(10, 2) DEFAULT 0;
```

## Testing

### Test Mode
Paysera provides test cards. Use these in development:
- **Card Number:** 4111111111111111
- **CVC:** 123
- **Expiry:** Any future date

### Payment Flow Testing
1. Click "Depozito" button
2. Select payment method
3. Enter test amount (e.g., €10.00)
4. Click "Vazhdo në Paysera"
5. Use test card credentials
6. Confirm payment
7. Verify success page shows correct amount

## Webhooks / Callbacks

Paysera will send payment status updates to your callback URL.

**Example webhook handler:**

```javascript
router.post('/callback', (req, res) => {
  try {
    const { orderId, amount, status, transactionId } = req.body;

    // Verify signature
    if (!verifyCallbackSignature(req.body)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Update payment status
    if (status === 'success') {
      updateUserWallet(orderId, amount);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Security Best Practices

✅ **DO:**
- Always verify signatures on callbacks
- Use HTTPS for all payment URLs
- Store credentials in environment variables
- Validate all amounts server-side
- Log all payment transactions
- Use CSRF tokens for sensitive operations

❌ **DON'T:**
- Expose API credentials in frontend code
- Trust client-side amount validation
- Skip signature verification
- Log sensitive payment data
- Allow payment amounts to be modified by users

## Troubleshooting

### Payment redirect not working
- Check Project ID is correct
- Verify API URL matches environment
- Ensure redirect URLs are HTTPS in production

### Signature mismatch errors
- Verify PASSWORD is correct
- Check signature generation order
- Ensure UTF-8 encoding

### Wallet not updating
- Check database connection
- Verify callback endpoint is receiving requests
- Check payment status in Paysera dashboard

## Support

For Paysera support:
- **Documentation:** https://www.paysera.com/en/about-us/news
- **API Reference:** https://developers.paysera.com/

For Polyshop integration support:
- Contact: support@polyshop.com
- Issue tracker: GitHub issues

## Production Checklist

- [ ] Get live Paysera credentials
- [ ] Update `.env` with live credentials
- [ ] Test all payment scenarios
- [ ] Set up error logging/monitoring
- [ ] Configure SSL certificates
- [ ] Enable CORS for payment domain
- [ ] Set up database backups
- [ ] Test refund process
- [ ] Document support procedures
- [ ] Deploy to production
