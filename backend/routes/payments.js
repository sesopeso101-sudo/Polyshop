const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// DB helper
const paymentDb = require('../db/paymentDb');

// Get credentials from environment variables
const PROJECT_ID = process.env.PAYSERA_PROJECT_ID;
const PASSWORD = process.env.PAYSERA_PASSWORD;
const PAYSERA_API_URL = 'https://www.paysera.com/api/web-to-pay/process.cgi';

// PayPal credentials
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_USE_SANDBOX = (process.env.PAYPAL_USE_SANDBOX || 'true') === 'true';

// Fetch helper (Node 18+ has global fetch). Fallback tries to require node-fetch if available.
let fetchFunc = (typeof fetch !== 'undefined') ? fetch : null;
if (!fetchFunc) {
  try {
    // eslint-disable-next-line global-require
    fetchFunc = require('node-fetch');
  } catch (e) {
    console.warn('Fetch is not available and node-fetch is not installed. PayPal endpoints will fail without a fetch implementation.');
  }
}

/**
 * Generate signature for Paysera
 * @param {Object} data - Payment data
 * @returns {String} MD5 signature
 */
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

/**
 * Verify callback signature from Paysera
 * @param {Object} data - Callback data from Paysera
 * @returns {Boolean} Is signature valid
 */
function verifySignature(data) {
  const { ss1, ss2, ...paymentData } = data;
  
  const message = [
    paymentData.projectid,
    paymentData.orderid,
    paymentData.amount,
    paymentData.currency,
    paymentData.accepturl,
    paymentData.cancelurl,
    paymentData.callbackurl,
  ].join(';');

  const calculatedSignature = crypto
    .createHash('md5')
    .update(message + ';' + PASSWORD)
    .digest('hex');

  return calculatedSignature === ss1;
}

/**
 * Initialize Payment (Paysera compatibility)
 * POST /api/payments/initialize
 */
router.post('/initialize', async (req, res) => {
  try {
    const { amount, currency, description, orderId, email, successUrl, failureUrl, callbackUrl } = req.body;

    // Validate required fields
    if (!amount || !orderId || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, orderId, email',
      });
    }

    // Prepare payment data for Paysera
    const paymentData = {
      projectid: PROJECT_ID,
      orderid: orderId,
      amount: Math.round(amount), // Already in cents from frontend
      currency: currency || 'EUR',
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

    // Generate signature
    const signature = generateSignature(paymentData);
    paymentData.sign = signature;

    // Build redirect URL with query parameters
    const queryString = new URLSearchParams(paymentData).toString();
    const redirectUrl = `${PAYSERA_API_URL}?${queryString}`;

    console.log('Payment initialized:', {
      orderId,
      amount: amount / 100,
      email,
    });

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

/**
 * Handle Paysera Callback
 * POST /api/payments/callback
 */
router.post('/callback', async (req, res) => {
  try {
    const callbackData = req.body;

    console.log('Paysera callback received:', callbackData);

    // Verify signature
    if (!verifySignature(callbackData)) {
      console.error('Invalid signature in callback');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { orderid, amount, currency, status } = callbackData;

    // Handle different payment statuses
    if (status === '1') {
      // Payment successful
      await updateUserWallet(orderid, amount / 100, 'success');
      console.log(`Payment successful: ${orderid}, Amount: ${amount / 100} ${currency}`);
    } else if (status === '2') {
      // Payment pending
      await updateUserWallet(orderid, amount / 100, 'pending');
      console.log(`Payment pending: ${orderid}`);
    } else {
      // Payment failed or cancelled
      await updateUserWallet(orderid, amount / 100, 'failed');
      console.log(`Payment failed: ${orderid}`);
    }

    // Always respond with 200 OK to Paysera
    res.json({ success: true });
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Verify Payment Status
 * POST /api/payments/verify
 */
router.post('/verify', async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;

    const paymentRecord = await getPaymentRecord(orderId);

    if (!paymentRecord) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
    }

    if (paymentRecord.status === 'success') {
      res.json({
        success: true,
        amount: paymentRecord.amount,
        transactionId: paymentRecord.transactionId,
        newBalance: paymentRecord.userBalance,
        timestamp: paymentRecord.createdAt,
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment not completed',
        status: paymentRecord.status,
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Get Payment History
 * GET /api/payments/history
 */
router.get('/history', async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payments = await getUserPayments(userId);

    res.json({
      success: true,
      payments: payments,
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// PayPal integration endpoints
// ==========================================

async function getPaypalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) throw new Error('PayPal credentials not configured');
  const tokenUrl = PAYPAL_USE_SANDBOX
    ? 'https://api-m.sandbox.paypal.com/v1/oauth2/token'
    : 'https://api-m.paypal.com/v1/oauth2/token';
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');

  const resp = await fetchFunc(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error('Failed to get PayPal access token: ' + text);
  }

  const json = await resp.json();
  return json.access_token;
}

// Create PayPal order
// POST /api/payments/paypal/create
router.post('/paypal/create', async (req, res) => {
  try {
    const { amount } = req.body; // expected in cents
    if (!amount || typeof amount !== 'number') return res.status(400).json({ error: 'Invalid amount' });
    if (amount < 700) return res.status(400).json({ error: 'Minimum deposit is 7 EUR' });

    const token = await getPaypalAccessToken();
    const PAYPAL_BASE = PAYPAL_USE_SANDBOX ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

    const orderBody = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: (amount / 100).toFixed(2)
          }
        }
      ]
    };

    const orderResp = await fetchFunc(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderBody)
    });

    if (!orderResp.ok) {
      const txt = await orderResp.text();
      console.error('PayPal create order failed:', txt);
      return res.status(500).json({ error: 'PayPal create order failed' });
    }

    const order = await orderResp.json();

    // Save order in DB so we can reconcile on capture
    try {
      await paymentDb.createPayment({
        order_id: order.id,
        user_id: req.user?.id || null,
        amount: amount, // cents
        currency: 'EUR',
        status: 'created'
      });
    } catch (dbErr) {
      console.error('Failed to save payment record:', dbErr);
      // don't fail the order creation because of DB - but log for later reconciliation
    }

    res.json({ id: order.id });
  } catch (err) {
    console.error('paypal/create error', err);
    res.status(500).json({ error: err.message });
  }
});

// Capture PayPal order
// POST /api/payments/paypal/capture
router.post('/paypal/capture', async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ error: 'orderId required' });

    const token = await getPaypalAccessToken();
    const PAYPAL_BASE = PAYPAL_USE_SANDBOX ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

    const capResp = await fetchFunc(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!capResp.ok) {
      const txt = await capResp.text();
      console.error('PayPal capture failed:', txt);
      return res.status(500).json({ error: 'PayPal capture failed' });
    }

    const capture = await capResp.json();

    // Extract capture status and amount
    const captureObj = capture.purchase_units && capture.purchase_units[0] && capture.purchase_units[0].payments && capture.purchase_units[0].payments.captures && capture.purchase_units[0].payments.captures[0];
    const captureStatus = capture.status || (captureObj && captureObj.status);
    const captureAmount = captureObj && captureObj.amount && captureObj.amount.value;
    const captureId = captureObj && captureObj.id;

    if (captureStatus === 'COMPLETED' || (captureObj && captureObj.status === 'COMPLETED')) {
      const amountEur = captureAmount ? parseFloat(captureAmount) : null;

      // Update DB and user wallet
      try {
        // Update payment status
        await paymentDb.updatePaymentStatus(orderId, 'success', captureId);

        // Get saved payment to identify user
        const payment = await paymentDb.getPaymentByOrderId(orderId);
        if (payment) {
          // credit wallet (updateWalletBalance expects euros)
          if (amountEur) {
            await paymentDb.updateWalletBalance(payment.user_id, amountEur, 'deposit');
            await paymentDb.logWalletTransaction(payment.user_id, payment.id, amountEur, 'deposit', 'success');
          }
        } else {
          console.warn('Payment record not found for orderId', orderId);
        }
      } catch (dbErr) {
        console.error('Error updating DB after capture:', dbErr);
        // continue, but flag for manual reconciliation
      }

      return res.json({ success: true, capture, status: 'COMPLETED' });
    }

    console.warn('PayPal capture not completed', capture);
    res.status(400).json({ success: false, capture });
  } catch (err) {
    console.error('paypal/capture error', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Database Helper Functions (Implement these as wrappers using paymentDb)
// ==========================================

/**
 * Update user wallet after payment (used by Paysera callback)
 */
async function updateUserWallet(orderId, amount, status) {
  try {
    const payment = await paymentDb.getPaymentByOrderId(orderId);
    if (!payment) {
      console.error('Payment record not found for orderId', orderId);
      return;
    }

    // update payment status
    await paymentDb.updatePaymentStatus(orderId, status, null);

    if (status === 'success') {
      // credit wallet (amount is expected in euros here)
      await paymentDb.updateWalletBalance(payment.user_id, amount, 'deposit');
      await paymentDb.logWalletTransaction(payment.user_id, payment.id, amount, 'deposit', 'success');
    }
  } catch (err) {
    console.error('updateUserWallet error:', err);
    throw err;
  }
}

/**
 * Get payment record from database
 */
async function getPaymentRecord(orderId) {
  try {
    return await paymentDb.getPaymentByOrderId(orderId);
  } catch (err) {
    console.error('getPaymentRecord error:', err);
    return null;
  }
}

/**
 * Get user payment history
 */
async function getUserPayments(userId) {
  try {
    return await paymentDb.getUserPayments(userId);
  } catch (err) {
    console.error('getUserPayments error:', err);
    return [];
  }
}

module.exports = router;
