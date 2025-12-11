import type { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../helper/ErrorHandler.js";

/* forme*/
export const errorMiddleware = (
    err : any,
    req : Request,
    res : Response,
    next : NextFunction
) : void =>{

    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            success: false,
            message: err.message
        });
        return;
    }

    console.error("Unexpected error:", err);  // ← Log to server console
    
    res.status(500).json({
        success: false,
        message: "Internal server error"  // ← Don't expose internal details
    });
}