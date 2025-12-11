import type { Request, Response, NextFunction } from "express";
import jwtHandeler from "../config/jwt.js";
import type { jwtDtoPayloud } from "../config/jwt.js";  // ← Separate type import
import { ErrorHandler } from "../helper/ErrorHandler.js";
import { UserRole } from "../entities/User/userTypes.js";


// note:
// 

declare global { 
    namespace Express {
        interface Request {
            user?: jwtDtoPayloud;
        }
    }
}

// Verify JWT token
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ErrorHandler("No token provided", 401);
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwtHandeler.verfyToken(token as string);

        req.user = decoded;
        next();
    } catch (error) {
        // Preserve our custom errors, only wrap JWT errors
        if (error instanceof ErrorHandler) {
            next(error);
            return;
        }
        next(new ErrorHandler("Invalid or expired token", 401));
    }
};

// Check if user has required role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            next(new ErrorHandler("Not authenticated", 401));
            return;
        }

        if (!roles.includes(req.user.role)) {
            next(new ErrorHandler("Access denied. Insufficient permissions", 403));
            return;
        }

        next();
    };
};

// Shortcut: Admin only middleware
export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        next(new ErrorHandler("Not authenticated", 401));
        return;
    }

    if (req.user.role !== UserRole.ADMIN) {
        next(new ErrorHandler("Access denied. Admin only", 403));
        return;
    }

    next();
};