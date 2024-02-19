import { Request, Response, NextFunction } from 'express';
import TokenService from '../services/token';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token == null) {
    return res.status(401).json({message:'missing Authorization header'});
  }

  const isValidToken = TokenService.validateToken(token);
  if (!isValidToken) {
    return res.status(403).json({message:'invalid token'});;
  }

  next();
};

export default authenticateToken;