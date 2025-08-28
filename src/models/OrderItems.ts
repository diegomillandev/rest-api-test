import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import Products from "./Products";
import Order from "./Order";

@Table({
  tableName: "order_items",
  timestamps: false,
})

class OrderItems extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare quantity: number;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare unitPrice: number;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare totalPrice: number;

  @ForeignKey(() => Order)
  @Column
  declare orderId: number;

  @BelongsTo(() => Order)
  declare order: Order;

  @ForeignKey(() => Products)
  @Column
  declare productId: number;

  @BelongsTo(() => Products)
  declare product: Products;
}

export default OrderItems;
