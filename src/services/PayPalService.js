/**
 * PayPal Payment Service
 * Handles all payment operations with PayPal API
 */

class PayPalService {
  constructor() {
    this.clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
    this.currency = process.env.REACT_APP_PAYPAL_CURRENCY || 'USD';
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001';
  }

  /**
   * Initialize a payment request with PayPal
   * @param {number} amount - Amount in USD
   * @param {string} description - Payment description
   * @param {string} orderId - Unique order identifier
   * @param {string} email - Customer email
   * @returns {Promise<Object>} Payment initialization response with approval URL
   */
  async initializePayment(amount, description, orderId, email) {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/payments/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount).toFixed(2),
          currency: this.currency,
          description,
          orderId,
          email,
          successUrl: `${window.location.origin}/payment-success`,
          failureUrl: `${window.location.origin}/payment-failure`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to initialize payment');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  }

  /**
   * Verify payment status with PayPal
   * @param {string} paymentId - PayPal Payment ID
   * @param {string} payerId - PayPal Payer ID
   * @returns {Promise<Object>} Payment status
   */
  async verifyPayment(paymentId, payerId) {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          payerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  /**
   * Get payment history for user
   * @returns {Promise<Array>} Array of payment transactions
   */
  async getPaymentHistory() {
    try {
      const response = await fetch(`${this.apiEndpoint}/api/payments/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment history');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment history error:', error);
      throw error;
    }
  }
}

// Create and export instance
const payPalService = new PayPalService();

export default payPalService;
