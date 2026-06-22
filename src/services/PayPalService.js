/**
 * PayPalService - frontend wrapper that talks to backend PayPal endpoints
 */

const PayPalService = {
  async createOrder(amount) {
    // amount: decimal EUR
    const response = await fetch('/api/payments/paypal/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create PayPal order');
    }

    return await response.json();
  },

  async captureOrder(orderId) {
    const response = await fetch('/api/payments/paypal/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to capture PayPal order');
    }

    return await response.json();
  },

  async getHistory() {
    const response = await fetch('/api/payments/paypal/history');
    if (!response.ok) throw new Error('Failed to fetch payment history');
    return await response.json();
  }
};

export default PayPalService;
