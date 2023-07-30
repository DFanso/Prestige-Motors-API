import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a middleware function
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Get the token from the request header
  const token = req.header('Authorization')?.split(' ')[1];

  // If no token is found, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET || '', (err, user) => {
    if (err) {
      // If the token is invalid or expired, return 403 Forbidden
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // If the token is valid, attach the user object to the request for use in other middleware or routes
    console.log(user)
    next();
  });
}
