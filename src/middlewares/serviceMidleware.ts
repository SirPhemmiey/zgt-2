import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { getService } from '../di-container';

export const injectService: express.RequestHandler = async (req, res, next) => {
    const service = getService();
    (req as any).service = service;
    next();
}

export const validateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    // Read the ID Token from the Authorization header.
    token = req.headers.authorization.split('Bearer ')[1];
  } else {
    res.status(403).json({error: 'No token found. Unauthorized'});
    console.log('shold return 403')
    return;
  }
  try {
    const v = jwt.verify(token, 'secretKey');
    (req as any).claims = v;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying token:', error);
    res.status(403).json({ "error": "Unauthorized. Invalid Token"});
    return;
  }
}