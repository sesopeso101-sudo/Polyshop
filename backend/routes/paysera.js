/**
 * Paysera routes have been removed. Any requests to these endpoints will receive a 410 Gone response.
 * This file is retained to avoid missing-route errors but explicitly rejects all calls related to Paysera.
 */

const express = require('express');
const router = express.Router();

router.use((req, res) => {
  res.status(410).json({
    success: false,
    error: 'Deposit/Paysera endpoints have been removed from this application.',
  });
});

module.exports = router;
