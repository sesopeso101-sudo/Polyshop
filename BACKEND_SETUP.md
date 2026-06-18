# Backend Setup Guide for Paysera Integration

## Overview
This guide walks you through setting up your Node.js/Express backend to handle Paysera payments.

---

## 1. Environment Variables Setup

Create a `.env` file in your backend root directory:

```env
# Paysera Credentials (from your Paysera merchant account)
PAYSERA_PROJECT_ID=your_project_id_here
PAYSERA_PASSWORD=your_signing_password_here

# Backend Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=your_database_connection_string
DB_HOST=localhost
DB_PORT=5432
DB_NAME=polyshop
DB_USER=postgres
DB_PASSWORD=your_password

# Frontend URLs
FRONTEND_URL=http://localhost:3000
PAYMENT_SUCCESS_URL=http://localhost:3000/payment-success
PAYMENT_FAILURE_URL=http://localhost:3000/payment-failure

# API
API_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

---

## 2. Install Dependencies

```bash
npm install express cors dotenv crypto uuid
npm install --save-dev nodemon
```

---

## 3. Main Server File Setup

Create `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/payments', paymentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Paysera Project ID: ${process.env.PAYSERA_PROJECT_ID}`);
});
```

---

## 4. Database Schema

Create `backend/migrations/create_payments_table.sql`:

```sql
-- Users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  wallet_balance DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(20) DEFAULT 'pending', -- pending, success, failed, cancelled
  paysera_transaction_id VARCHAR(255),
  payment_method VARCHAR(50), -- card, bank_transfer
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(order_id),
  INDEX(user_id),
  INDEX(status)
);

-- Wallet transactions (for audit trail)
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  payment_id INTEGER REFERENCES payments(id),
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(50), -- deposit, withdrawal, refund
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(user_id)
);
```

---

## 5. Database Helper Functions

Create `backend/db/paymentDb.js`:

```javascript
const pool = require('./connection'); // Your database connection pool

/**
 * Create payment record
 */
async function createPayment(userId, orderId, amount, paymentMethod = 'card') {
  const query = `
    INSERT INTO payments (user_id, order_id, amount, currency, payment_method, status)
    VALUES ($1, $2, $3, 'EUR', $4, 'pending')
    RETURNING *
  `;
  
  try {
    const result = await pool.query(query, [userId, orderId, amount, paymentMethod]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

/**
 * Update payment status
 */
async function updatePaymentStatus(orderId, status, transactionId) {
  const query = `
    UPDATE payments
    SET status = $1, paysera_transaction_id = $2, updated_at = NOW()
    WHERE order_id = $3
    RETURNING *
  `;
  
  try {
    const result = await pool.query(query, [status, transactionId, orderId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating payment:', error);
    throw error;
  }
}

/**
 * Update user wallet balance
 */
async function updateWalletBalance(userId, amount, type = 'deposit') {
  const query = `
    UPDATE users
    SET wallet_balance = wallet_balance + $1, updated_at = NOW()
    WHERE id = $2
    RETURNING wallet_balance
  `;
  
  try {
    const result = await pool.query(query, [amount, userId]);
    return result.rows[0].wallet_balance;
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
}

/**
 * Log wallet transaction
 */
async function logWalletTransaction(userId, paymentId, amount, type, status) {
  const query = `
    INSERT INTO wallet_transactions (user_id, payment_id, amount, type, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  try {
    const result = await pool.query(query, [userId, paymentId, amount, type, status]);
    return result.rows[0];
  } catch (error) {
    console.error('Error logging transaction:', error);
    throw error;
  }
}

/**
 * Get payment by order ID
 */
async function getPaymentByOrderId(orderId) {
  const query = `
    SELECT p.*, u.id as user_id, u.email
    FROM payments p
    JOIN users u ON p.user_id = u.id
    WHERE p.order_id = $1
  `;
  
  try {
    const result = await pool.query(query, [orderId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error;
  }
}

/**
 * Get user payments
 */
async function getUserPayments(userId, limit = 50, offset = 0) {
  const query = `
    SELECT * FROM payments
    WHERE user_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;
  
  try {
    const result = await pool.query(query, [userId, limit, offset]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching user payments:', error);
    throw error;
  }
}

module.exports = {
  createPayment,
  updatePaymentStatus,
  updateWalletBalance,
  logWalletTransaction,
  getPaymentByOrderId,
  getUserPayments,
};
```

---

## 6. Integration in Payment Routes

Update `backend/routes/payments.js` to use database functions:

```javascript
const paymentDb = require('../db/paymentDb');

// In the callback handler, replace updateUserWallet with:
async function handleSuccessfulPayment(orderId, amount, transactionId) {
  const payment = await paymentDb.getPaymentByOrderId(orderId);
  
  if (!payment) {
    console.error('Payment record not found:', orderId);
    return;
  }

  // Update payment status
  await paymentDb.updatePaymentStatus(orderId, 'success', transactionId);

  // Update wallet balance
  const newBalance = await paymentDb.updateWalletBalance(
    payment.user_id,
    amount,
    'deposit'
  );

  // Log transaction
  await paymentDb.logWalletTransaction(
    payment.user_id,
    payment.id,
    amount,
    'deposit',
    'success'
  );

  console.log(`✅ Payment successful: ${orderId}, New balance: €${newBalance}`);
}
```

---

## 7. Testing Paysera Integration

### Step 1: Get Test Credentials
1. Log in to your Paysera dashboard
2. Navigate to **Settings → API Access**
3. Copy your **Project ID** and **Signing Password**

### Step 2: Start Backend
```bash
cd backend
npm install
node server.js
```

### Step 3: Test Payment Flow

**Option A: Using cURL**
```bash
curl -X POST http://localhost:3001/api/payments/initialize \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "currency": "EUR",
    "orderId": "test_order_123",
    "email": "test@example.com",
    "successUrl": "http://localhost:3000/payment-success",
    "failureUrl": "http://localhost:3000/payment-failure",
    "callbackUrl": "http://localhost:3001/api/payments/callback"
  }'
```

**Option B: Using Postman**
- Create POST request to `http://localhost:3001/api/payments/initialize`
- Add JSON body with payment details
- Send and copy the `redirectUrl`
- Paste in browser

### Step 4: Complete Test Payment
1. Click redirect URL
2. Use Paysera test card: **4111111111111111**
3. Enter any future expiry and CVC
4. Complete payment
5. Verify wallet is updated

---

## 8. Production Checklist

- [ ] Get live Paysera credentials (replace test credentials)
- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS on your backend
- [ ] Configure database backups
- [ ] Set up error logging (Sentry, LogRocket, etc.)
- [ ] Test with real credit cards (small amounts)
- [ ] Set up webhook monitoring
- [ ] Configure rate limiting
- [ ] Document refund process
- [ ] Set up payment reconciliation script

---

## 9. Key Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/payments/initialize` | Start payment process |
| POST | `/api/payments/callback` | Receive Paysera updates |
| POST | `/api/payments/verify` | Verify payment status |
| GET | `/api/payments/history` | Get user payment history |

---

## 10. Troubleshooting

### Signature mismatch error
- ✅ Verify Project ID and Password are correct
- ✅ Ensure PASSWORD is the "Signing password", not API password
- ✅ Check signature generation order matches Paysera docs

### Callback not received
- ✅ Ensure backend is publicly accessible (not localhost)
- ✅ Check callback URL in Paysera settings
- ✅ Verify firewall allows Paysera IPs
- ✅ Check server logs for callback requests

### Payment not updating wallet
- ✅ Verify payment status is `success` (status = 1 from Paysera)
- ✅ Check database connection is working
- ✅ Verify user exists in database
- ✅ Check for SQL errors in logs

---

## 11. Next Steps

1. ✅ Set up database schema
2. ✅ Configure environment variables
3. ✅ Start backend server
4. ✅ Test payment initialization
5. ✅ Complete test payment
6. ✅ Verify wallet updates
7. ✅ Deploy to production

---

## Resources

- **Paysera Docs:** https://developers.paysera.com/
- **Test Payment:** https://developers.paysera.com/en/payment-gateway/test-payment
- **API Reference:** https://developers.paysera.com/en/payment-gateway/integration

Need help? Check `backend/routes/payments.js` for complete implementation!
