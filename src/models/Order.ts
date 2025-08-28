import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  Default,
} from "sequelize-typescript";
import OrderItems from "./OrderItems";
import User from "./User";

@Table({
  tableName: "orders",
  timestamps: false,
})
class Order extends Model {
  
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
  })
  declare purchaseDate: Date;

  @Default(0)
  @Column({
    type: DataType.INTEGER
  })
  declare totalPrice: number;

  @HasMany(() => OrderItems)
  declare orderItems: OrderItems[];

  @ForeignKey(() => User)
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}

export default Order;