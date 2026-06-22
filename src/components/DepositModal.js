// DepositModal removed.
// The deposit flow (amount selection and order creation) has been simplified to redirect
// users directly to the PayPal deposit URL. This file is left as a stub to avoid import
// errors in case any other files reference it accidentally. Prefer deleting this file
// once imports are cleaned up.

export default function DepositModal() {
  console.warn('DepositModal is removed - deposits now redirect directly to PayPal.');
  return null;
}
