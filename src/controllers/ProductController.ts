import { Request, Response } from 'express';
import Products from '../models/Products';
import catchErrors from '../utils/catchErrors';

export class ProductController {
    static getAll = catchErrors(async (req: Request, res: Response) => {
        const products = await Products.findAll({
                attributes: { exclude: ['updatedAt'] }
            });
        res.json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
            error: null
        });
    })
    static create = catchErrors(async (req: Request, res: Response) => {

        const product = new Products(req.body);
        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
            error: null
        });  
    })
    static getById = catchErrors(async (req: Request, res: Response) => {
        return res.json({
            success: true,
            message: "Product retrieved successfully",
            data: req.product,
            error: null
        });
    });
    static update = catchErrors(async (req: Request, res: Response) => {
       
        const product = await req.product.update(req.body);

        res.json({
            success: true,
            message: "Product updated successfully",
            data: null,
            error: null
        });

    })
    static delete = catchErrors(async (req: Request, res: Response) => {
    
        await req.product.destroy();

        res.json({
            success: true,
            message: "Product deleted successfully",
            data: null,
            error: null
        });
    })
}