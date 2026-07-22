const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

   console.log('ALL HEADERS:', req.headers);
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      // Extract token from "Bearer <token>"
      token = authHeader.split(' ')[1];

      // Verify token using the same secret used to sign it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach decoded payload (userId) to the request
      req.user = decoded;

      next(); // move on to the actual route handler
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;