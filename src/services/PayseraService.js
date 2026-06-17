/**
 * Paysera Payment Service
 * Handles all payment operations with Paysera API
 */

class PayseraService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_PAYSERA_API_URL || 'https://www.paysera.com/api/v1';
    this.projectId = process.env.REACT_APP_PAYSERA_PROJECT_ID;
  }

  /**
   * Initialize a payment request
   * @param {number} amount - Amount in EUR
   * @param {string} description - Payment description
   * @param {string} orderId - Unique order identifier
   * @param {string} email - Customer email
   * @returns {Promise<Object>} Payment initialization response
   */
  async initializePayment(amount, description, orderId, email) {
    try {
      // Call your backend to generate the payment request
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert EUR to cents
          currency: 'EUR',
          description,
          orderId,
          email,
          successUrl: `${window.location.origin}/payment-success`,
          failureUrl: `${window.location.origin}/payment-failure`,
          callbackUrl: `${window.location.origin}/api/payments/callback`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  }

  /**
   * Verify payment status
   * @param {string} paymentId - Payment ID from Paysera
   * @returns {Promise<Object>} Payment status
   */
  async verifyPayment(paymentId) {
    try {
      const response = await fetch(`/api/payments/verify/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
      const response = await fetch('/api/payments/history', {
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
const payseraService = new PayseraService();

export default payseraService;
