import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Check if token exists in the Authorization header
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

  try {
    const decoded = jwt.verify(token, 'jwtSecretKey'); // Replace with env variable in real apps
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

export default authMiddleware;
