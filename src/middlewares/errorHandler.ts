import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`PATH: ${req.path}`, err);

    return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
        data: null,
        error: {
            code: "SERVER_ERROR"
        }
    });
};

export default errorHandler;