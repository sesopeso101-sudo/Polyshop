/**
 * Paysera Payment Routes
 * Handles payment initialization, verification, and callbacks
 */

const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Get credentials from environment variables
const PAYSERA_PROJECT_ID = process.env.PAYSERA_PROJECT_ID;
const PAYSERA_PASSWORD = process.env.PAYSERA_PASSWORD;
const PAYSERA_API_URL = process.env.PAYSERA_API_URL || 'https://www.paysera.com/api/v1';

/**
 * Generate signature for Paysera
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
    .update(message + ';' + PAYSERA_PASSWORD)
    .digest('hex');
}

/**
 * Verify callback signature from Paysera
 */
function verifyCallbackSignature(data) {
  const expectedSignature = generateSignature(data);
  return data.sign === expectedSignature;
}

/**
 * Initialize Payment
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

    if (!PAYSERA_PROJECT_ID || !PAYSERA_PASSWORD) {
      return res.status(500).json({
        success: false,
        error: 'Paysera credentials not configured',
      });
    }

    // Prepare payment data for Paysera
    const paymentData = {
      projectid: PAYSERA_PROJECT_ID,
      orderid: orderId,
      amount: Math.round(amount * 100), // Convert EUR to cents
      currency: currency || 'EUR',
      accepturl: successUrl || `${req.get('origin')}/payment-success`,
      cancelurl: failureUrl || `${req.get('origin')}/payment-failure`,
      callbackurl: callbackUrl || `${req.get('origin')}/api/payments/paysera/callback`,
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

    // Build redirect URL
    const queryString = new URLSearchParams(paymentData).toString();
    const redirectUrl = `${PAYSERA_API_URL}/payment?${queryString}`;

    console.log('Paysera payment initialized:', { orderId, amount, currency });

    res.json({
      success: true,
      redirectUrl: redirectUrl,
      orderId: orderId,
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
 * Paysera Callback
 * POST /api/payments/paysera/callback
 */
router.post('/callback', async (req, res) => {
  try {
    const paymentData = req.body;

    // Verify signature
    if (!verifyCallbackSignature(paymentData)) {
      console.error('Invalid Paysera callback signature');
      return res.status(401).json({ success: false, error: 'Invalid signature' });
    }

    const { orderid, amount, status, transactionid } = paymentData;

    console.log(`Paysera callback received: orderId=${orderid}, status=${status}, amount=${amount}`);

    // Update payment status in database
    if (status === 'success') {
      await updateUserWallet(orderid, amount / 100, 'success', transactionid);
      console.log(`Payment successful: ${orderid}, Amount: €${amount / 100}`);
    } else {
      await updateUserWallet(orderid, amount / 100, status, transactionid);
      console.log(`Payment status: ${orderid}, Status: ${status}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Callback error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Verify Payment
 * GET /api/payments/verify/:paymentId
 */
router.get('/verify/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Query database for payment status
    const payment = await getPaymentStatus(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
    }

    res.json({
      success: true,
      payment: payment,
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ success: false, error: error.message });
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
// Database Helper Functions
// ==========================================

/**
 * Update user wallet after payment
 */
async function updateUserWallet(orderId, amount, status, transactionId) {
  try {
    // TODO: Implement with your database
    // 1. Find user by orderId
    // 2. Update wallet balance if status === 'success'
    // 3. Update payment status in database
    // 4. Log transaction
    
    console.log(`TODO: Update wallet for order ${orderId}, amount €${amount}, status ${status}, transaction ${transactionId}`);
    
    // Example with database:
    // const db = require('../db');
    // await db.payments.updateStatus(orderId, status, transactionId);
    // if (status === 'success') {
    //   const user = await db.users.findByOrderId(orderId);
    //   await db.wallets.addBalance(user.id, amount);
    // }
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
}

/**
 * Get payment status
 */
async function getPaymentStatus(paymentId) {
  try {
    // TODO: Query database for payment
    // const db = require('../db');
    // return await db.payments.findById(paymentId);
    return null;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
}

/**
 * Get user payment history
 */
async function getUserPayments(userId) {
  try {
    // TODO: Query payments for user
    // const db = require('../db');
    // return await db.payments.findByUserId(userId);
    return [];
  } catch (error) {
    console.error('Error getting user payments:', error);
    throw error;
  }
}

module.exports = router;
