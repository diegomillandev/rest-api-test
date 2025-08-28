import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  AllowNull,
  Unique,
} from "sequelize-typescript";
import OrderItem from "./OrderItems";

@Table({
  tableName: "products",
})
class Products extends Model {
    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(30),
    })
    declare batchNumber: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
    })
    declare name: string;

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    declare price: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    declare availableQuantity: number;

    @HasMany(() => OrderItem)
    declare orderItems: OrderItem[];
}

export default Products;
