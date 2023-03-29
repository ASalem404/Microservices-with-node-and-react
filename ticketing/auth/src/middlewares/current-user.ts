import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPaylod {
  id: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPaylod;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) return next();
  try {
    const paylod = jwt.verify(req.session.jwt, process.env.jwt!) as UserPaylod;
    req.currentUser = paylod;
  } catch (error) {}
  next();
};
