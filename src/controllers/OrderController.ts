import { Request, Response } from "express";

import catchErrors from "../utils/catchErrors";
import Order from "../models/Order";
import { db } from "../config/db";
import OrderItems from "../models/OrderItems";
import Products from "../models/Products";

type OrderItem = {
  productId: number;
  quantity: number;
  unitPrice: number;
};

export class OrderController {
  static getAll = catchErrors(async (req: Request, res: Response) => {
    const orders = await Order.findAll({
      where: req.user.role === "admin" ? {} : { userId: req.user.id },
      include: [
        {
          model: OrderItems,
        },
      ],
    });
    res.json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
      error: null,
    });
  });
  static create = catchErrors(async (req: Request, res: Response) => {
    const t = await db.transaction();

    const { orderDate, items } = req.body;

    const order = await Order.create(
      { purchaseDate: orderDate, userId: req.user.id },
      { transaction: t }
    );

    await Promise.all(
      items.map(async (item: OrderItem) => {
        const subtotal = item.quantity * item.unitPrice;
        return await OrderItems.create(
          {
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: subtotal,
            orderId: order.id,
            productId: item.productId,
          },
          { transaction: t }
        );
      })
    );

    order.totalPrice = items
      .map((item: OrderItem) => item.quantity * item.unitPrice)
      .reduce((acc: number, curr: number) => acc + curr, 0);

    await order.save({ transaction: t });
    await t.commit();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: null,
      error: null,
    });
  });
  static getById = catchErrors(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findOne({
      where: {
        id: orderId,
        ...(req.user.role === "admin" ? {} : { userId: req.user.id }),
      },
      include: [
        {
          model: OrderItems,
          attributes: ["quantity", "unitPrice", "totalPrice"],
          include: [
            {
              model: Products,
              attributes: ["id", "name", "batchNumber"],
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or access denied",
        data: null,
        error: "Order not found or access denied",
      });
    }

    return res.json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
      error: null,
    });
  });
}
