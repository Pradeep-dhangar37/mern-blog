import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
    console.log('No token provided');
    return next(errorHandler(401, 'Unauthorized'));
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err);
      return next(errorHandler(401, 'Unauthorized'));
    }
    
    console.log('Verified User:', user);
    req.user = user;
    next();
  });
};
