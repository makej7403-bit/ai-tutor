const rateLimit = require("express-rate-limit");

function createLimiter(windowMinutes = 1, max = 30) {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    message: { error: "Too many requests, slow down." },
    standardHeaders: true,
    legacyHeaders: false
  });
}

module.exports = createLimiter;
