// PayseraService deprecated: deposits removed from the application.
// If any code still imports this service, calls will be rejected with a clear error.

const PayseraService = {
  async initializePayment() {
    throw new Error('Deposit functionality has been removed from this application.');
  },
  async verifyPayment() {
    throw new Error('Deposit functionality has been removed from this application.');
  },
  async getPaymentHistory() {
    throw new Error('Deposit functionality has been removed from this application.');
  },
};

export default PayseraService;
