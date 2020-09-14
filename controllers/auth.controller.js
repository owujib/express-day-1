const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const token = req.header('auth_token');

  if (!token) return res.status(401).send('Access Denied 🛑🛑‼🚫');

  try {
    const verified = jwt.verify(token, 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
