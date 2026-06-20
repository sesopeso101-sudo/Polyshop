class PayPalService {
  async createOrder(amount) {
    const res = await fetch('/api/payments/paypal/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(amount * 100) }) // send cents
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error('Failed to create PayPal order: ' + txt);
    }
    return await res.json();
  }

  async captureOrder(orderId) {
    const res = await fetch('/api/payments/paypal/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error('Failed to capture PayPal order: ' + txt);
    }
    return await res.json();
  }
}

const payPalService = new PayPalService();
export default payPalService;
