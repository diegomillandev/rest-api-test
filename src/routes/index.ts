import { Router } from "express";
import routerProducts from "./products";
import routerOrders from "./orders";
import routerUsers from "./users";

const router = Router();

router.use('/auth', routerUsers);
router.use("/products", routerProducts);
router.use("/orders", routerOrders)

export default router;
