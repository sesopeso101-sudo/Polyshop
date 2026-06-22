/**
 * PayPal payment routes
 * - POST /api/payments/paypal/create -> creates a PayPal order and returns approval url
 * - POST /api/payments/paypal/capture -> captures an order after redirect and returns status
 * - GET  /api/payments/paypal/history -> returns user's payment history (if DB available)
 */

const express = require('express');
const axios = require('axios');
const router = express.Router();

const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const CURRENCY = process.env.PAYPAL_CURRENCY || 'EUR';

function paypalBase() {
  return PAYPAL_MODE === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
}

async function getAccessToken() {
  const base = paypalBase();
  const tokenUrl = `${base}/v1/oauth2/token`;
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');

  const resp = await axios.post(tokenUrl, 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return resp.data.access_token;
}

// Create order
router.post('/create', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid amount' });
    }

    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      return res.status(500).json({ success: false, error: 'PayPal credentials are not configured' });
    }

    const accessToken = await getAccessToken();

    const base = paypalBase();
    const returnUrl = `${req.get('origin')}/payment-success`;
    const cancelUrl = `${req.get('origin')}/payment-failure`;

    const body = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: CURRENCY,
            value: parseFloat(amount).toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: 'Polyshop',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    };

    const createResp = await axios.post(`${base}/v2/checkout/orders`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const order = createResp.data;
    const approval = order.links.find((l) => l.rel === 'approve');

    res.json({ success: true, orderId: order.id, approvalUrl: approval ? approval.href : null });
  } catch (error) {
    console.error('PayPal create order error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to create PayPal order' });
  }
});

// Capture order
router.post('/capture', async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, error: 'Missing orderId' });

    const accessToken = await getAccessToken();
    const base = paypalBase();

    const captureResp = await axios.post(`${base}/v2/checkout/orders/${orderId}/capture`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const capture = captureResp.data;

    // At this point, you should update your database to mark the transaction completed and
    // credit the user's wallet. We avoid direct DB calls here unless a payment DB helper exists.
    // Attempt to call payment DB helper if present (optional):
    try {
      const paymentDb = require('../db/paymentDb');
      // paymentDb.logWalletTransaction or updateWalletBalance can be used here if available.
      // This is optional and will be skipped if the module is missing.
      // Example (pseudocode):
      // await paymentDb.createPaymentRecord(...)
    } catch (e) {
      // No DB helper - skip DB write. Logging only.
      console.log('No paymentDb available to persist PayPal transaction - skipping DB write.');
    }

    res.json({ success: true, capture });
  } catch (error) {
    console.error('PayPal capture error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to capture PayPal order' });
  }
});

// Simple history endpoint (relies on optional DB)
router.get('/history', async (req, res) => {
  try {
    try {
      const paymentDb = require('../db/paymentDb');
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });
      const payments = await paymentDb.getUserPayments(userId);
      return res.json({ success: true, payments });
    } catch (e) {
      return res.json({ success: true, payments: [] });
    }
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch history' });
  }
});

module.exports = router;
