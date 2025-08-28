import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  Unique,
  Default,
  AllowNull,
} from "sequelize-typescript";
import Order from "./Order";

@Table({
    tableName: "users",
})

class User extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(30),
    })
    declare name: string;

    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare email: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string;

    @Default("client")
    @Column({
        type: DataType.ENUM("client", "admin"),
    })
    declare role: "client" | "admin";

    @HasMany(() => Order)
    declare orders: Order[];
}

export default User;
