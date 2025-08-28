import { Request, Response, NextFunction } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from './validation'
import catchErrors from '../utils/catchErrors'
import Products from '../models/Products'

declare global {
    namespace Express {
        interface Request {
            product?: Products
        }
    }
}

export const validateProductId = async (req: Request, res: Response, next: NextFunction) => {
     await param("productId")
        .isInt().withMessage("ID must be a number")
        .custom((value) => value > 0).withMessage("ID must be greater than zero").run(req),
    handleInputErrors(req, res, next)
}

export const validateProductBody = async (req: Request, res: Response, next: NextFunction) => {
    await body("batchNumber").notEmpty().withMessage("Batch number is required").run(req)
    await body("name").notEmpty().withMessage("Name is required").run(req)
    await body("price")
        .notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price must be a number")
        .custom((value) => value > 0).withMessage("Price must be greater than zero").run(req)
    await body("availableQuantity")
        .notEmpty().withMessage("Available quantity is required")
        .isNumeric().withMessage("Available quantity must be a number")
        .custom((value) => Number.isInteger(value) && value >= 0).withMessage("Available quantity must be a non-negative integer").run(req)
    handleInputErrors(req, res, next)
}

export const validateBatchNumberUnique = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const { batchNumber } = req.body;
        const { productId } = req.params;

        const findBatchNumber = await Products.findOne({ where: { batchNumber } });

        if (findBatchNumber && findBatchNumber.id.toString() !== productId) {
            return res.status(400).json({
                success: false,
                message: "Batch number already exists",
                data: null,
                error: {
                    code: "BATCH_NUMBER_EXISTS"
                }
            });
        }

        next();
})

export const validateProductExist = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
        const { productId } = req.params;

        const product = await Products.findByPk(productId, {
            attributes: { exclude: ['updatedAt'] }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
                error: { code: "NOT_FOUND" }
            });
        }

        req.product = product;

        next();
})