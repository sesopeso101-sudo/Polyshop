/**
 * PayPalService - frontend wrapper for server-side PayPal endpoints.
 *
 * NOTE: The frontend no longer creates orders or sends amounts. Deposits are handled
 * directly via the external PayPal deposit URL. The backend should still handle any
 * capture/webhook logic and history endpoints.
 */

const PayPalService = {
  // createOrder removed: deposit amounts are handled in PayPal directly.

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
