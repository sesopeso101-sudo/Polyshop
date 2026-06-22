# PayPal Integration Guide

This file replaces the previous Paysera integration guide. The application now uses PayPal for deposit payments.

## Environment variables
- PAYPAL_CLIENT_ID=your_paypal_client_id
- PAYPAL_SECRET=your_paypal_secret
- PAYPAL_MODE=sandbox (or live)
- PAYPAL_CURRENCY=EUR

## Backend endpoints
- POST /api/payments/paypal/create - Create a PayPal order. Body: { amount }
- POST /api/payments/paypal/capture - Capture an order after user returns from PayPal. Body: { orderId }
- GET  /api/payments/paypal/history - Get user's deposit history (requires DB helper)

## Frontend
The frontend uses a Deposit modal which calls `/api/payments/paypal/create` and redirects the user to PayPal's approval URL. After the user completes payment on PayPal, PayPal redirects back to `/payment-success` where the app captures the order server-side.

## Notes
- Ensure PAYPAL_CLIENT_ID and PAYPAL_SECRET are set in your environment.
- Verify webhooks in PayPal dashboard if you want asynchronous verification.
- The server-side capture endpoint should be the only place that credits user balances.
- Keep historical Paysera records if needed, but new deposits will use PayPal.
