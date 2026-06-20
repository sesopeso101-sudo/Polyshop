/**
 * PayPal Payment Routes
 * Handles payment initialization, verification, and callbacks
 */

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get credentials from environment variables
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';

const PAYPAL_API_BASE = PAYPAL_MODE === 'production' 
  ? 'https://api.paypal.com'
  : 'https://api.sandbox.paypal.com';

/**
 * Get PayPal Access Token
 * @returns {Promise<String>} Access token
 */
async function getPayPalAccessToken() {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error('PayPal credentials not configured. Check PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env');
    }

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with PayPal: ' + (error.response?.data?.error_description || error.message));
  }
}

/**
 * Initialize Payment
 * POST /api/payments/initialize
 */
router.post('/initialize', async (req, res) => {
  try {
    const { amount, currency, description, orderId, email, successUrl, failureUrl } = req.body;

    // Validate required fields
    if (!amount || !orderId || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, orderId, email',
      });
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create payment object
    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
        payer_info: {
          email: email,
        },
      },
      redirect_urls: {
        return_url: `${successUrl}?orderId=${orderId}`,
        cancel_url: failureUrl,
      },
      transactions: [
        {
          amount: {
            total: parseFloat(amount).toFixed(2),
            currency: currency || 'USD',
            details: {
              subtotal: parseFloat(amount).toFixed(2),
            },
          },
          description: description,
          invoice_number: orderId,
          custom: orderId,
        },
      ],
    };

    console.log('Creating PayPal payment with data:', {
      amount: paymentData.transactions[0].amount.total,
      currency: paymentData.transactions[0].amount.currency,
      orderId,
      email,
    });

    // Create payment with PayPal
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/payments/payment`,
      paymentData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const payment = response.data;

    // Find approval URL
    const approvalUrl = payment.links.find(link => link.rel === 'approval_url')?.href;

    if (!approvalUrl) {
      throw new Error('No approval URL in PayPal response');
    }

    console.log('Payment initialized successfully:', {
      orderId,
      amount: amount,
      paymentId: payment.id,
    });

    res.json({
      success: true,
      approvalUrl: approvalUrl,
      orderId: orderId,
      paymentId: payment.id,
    });
  } catch (error) {
    console.error('Payment initialization error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to initialize payment',
    });
  }
});

/**
 * Execute/Verify Payment
 * POST /api/payments/verify
 */
router.post('/verify', async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    if (!paymentId || !payerId) {
      return res.status(400).json({
        success: false,
        error: 'Missing paymentId or payerId',
      });
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Execute payment
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/payments/payment/${paymentId}/execute`,
      { payer_id: payerId },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const payment = response.data;

    if (payment.state !== 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Payment was not approved',
        status: payment.state,
      });
    }

    // Extract transaction details
    const sale = payment.transactions[0].related_resources[0].sale;
    const amount = payment.transactions[0].amount.total;

    // Update user wallet in database
    await updateUserWallet(orderId, parseFloat(amount), 'success', sale.id);

    console.log(`Payment successful: ${orderId}, Amount: ${amount}, Transaction: ${sale.id}`);

    res.json({
      success: true,
      amount: parseFloat(amount),
      transactionId: sale.id,
      orderId: orderId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to verify payment',
    });
  }
});

/**
 * Get Payment History
 * GET /api/payments/history
 */
router.get('/history', async (req, res) => {
  try {
    // TODO: Get payments for authenticated user
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
// Database Helper Functions (Implement these)
// ==========================================

/**
 * Update user wallet after payment
 */
async function updateUserWallet(orderId, amount, status, transactionId) {
  // TODO: Implement
  // 1. Find user by orderId
  // 2. Update wallet balance
  // 3. Update payment status in database
  console.log(`TODO: Update wallet for order ${orderId}, amount ${amount}, status ${status}, transaction ${transactionId}`);
}

/**
 * Get user payment history
 */
async function getUserPayments(userId) {
  // TODO: Implement - Query payments for user
  // Return array of payments
  console.log(`TODO: Get payments for user ${userId}`);
  return [];
}

module.exports = router;
