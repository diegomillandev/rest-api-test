import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/env';
import User from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({
            success: false,
            message: "No authorization header",
            data: null,
            error: "No token provided"
        });
    }

    const [ ,token] = bearer.split(' ');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
            data: null,
            error: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(typeof decoded === 'object' && decoded.id) {
            const user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email', 'role']
            });

            if(!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                    data: null,
                    error: "User not found"
                });
            }

            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
            data: null,
            error: "Invalid token"
        });
    }
}


export const authorize = (roles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as { id: number; role: string };
    
      console.log('User role:', user?.role);

      if (!user) {
        return res.status(401).json({ message: "No autorizado" });
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ 
            success: false,
            message: "Forbidden - Not have access",
            data: null,
            error: "Forbidden"
         });
      }

      next();
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        message: "Error en el servidor",
        data: null,
        error: ""
      });
    }
  };
}