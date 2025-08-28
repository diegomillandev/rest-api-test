import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { validateBatchNumberUnique, validateProductBody, validateProductExist, validateProductId } from "../middlewares/product";
import { authenticate, authorize } from "../middlewares/auth";

const router = Router();

router.use(authenticate);
router.param('productId', validateProductId);
router.param('productId', validateProductExist);

router.get("/",
    authorize(["admin", "client"]),
    ProductController.getAll
);

router.post("/", 
    authorize(["admin"]),
    validateProductBody,
    validateBatchNumberUnique, 
    ProductController.create
);
router.get("/:productId",
    authorize(["admin", "client"]),
    ProductController.getById
);
router.put("/:productId",
    authorize(["admin"]),
    validateProductBody,
    validateBatchNumberUnique,
    ProductController.update
);
router.delete("/:productId", 
    authorize(["admin"]),
    ProductController.delete
);

export default router;