const jwt = require('jsonwebtoken');
const secret = "yogesh@123"

const isUserAuthenticate = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
  }

  try {
    const data = jwt.verify(token, secret);
    req.user = data; // Adding the user information to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(400).json({ success: false, user:null, message: 'Invalid Token' });
  }
};

module.exports = isUserAuthenticate;
