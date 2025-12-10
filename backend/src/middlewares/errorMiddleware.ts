import type { Request, Response, NextFunction } from "express";


export const errorMiddleware = (
    err : any,
    req : Request,
    res :Response,
    next : NextFunction
) : void =>{

    const status = err.statusCode;
    const message = err.message;
    res.status(status).json({
        message : message
    });
}