const rateLimiter = require('express-rate-limit');

const limit = rateLimiter({
  windowMs: 50000,
  limit: 10000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

module.exports = limit;
