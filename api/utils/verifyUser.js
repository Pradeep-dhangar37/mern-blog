export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log('Token:', token); // Debugging line
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err); // Debugging line
      return next(errorHandler(401, 'Unauthorized'));
    }
    console.log('Verified User:', user); // Debugging line
    req.user = user;
    next();
  });
};
