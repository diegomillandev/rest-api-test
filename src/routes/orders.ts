import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { authenticate } from "../middlewares/auth";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

const router = Router();

router.use(authenticate);
router.get('/', OrderController.getAll);
router.post('/', 
    body('orderDate').notEmpty().withMessage('Order date is required'),
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.productId').isNumeric().withMessage('Product ID must be a number'),
    body('items.*.quantity').isNumeric().withMessage('Quantity must be a number'),
    body('items.*.unitPrice').isNumeric().withMessage('Unit price must be a number'),
    handleInputErrors,
    OrderController.create
);
router.get('/:orderId', OrderController.getById);

export default router;

