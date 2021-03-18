import {
    IsEmail,
    Column, CreatedAt,
    DataType,
    Default, IsUUID,
    Model,
    PrimaryKey,
    Table, Unique, UpdatedAt, BelongsToMany, HasOne, AllowNull, HasMany, BelongsTo, ForeignKey, AutoIncrement,
} from 'sequelize-typescript';
import { Shop } from 'src/shops/models/shop.model';
import { User } from 'src/users/user.model';
import { OrderItem } from './order-item.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    total: number;

    @Column
    status: string;

    @Column({ field: 'buyer_id' })
    @ForeignKey(() => User)
    buyerId: number;

    @BelongsTo(() => User, { foreignKey: 'buyer_id' })
    buyer: User;

    @Column({ field: 'seller_id' })
    @ForeignKey(() => User)
    sellerId: number;

    @BelongsTo(() => User, { foreignKey: 'seller_id' })
    seller: User;

    @Column({ field: 'shop_id' })
    @ForeignKey(() => Shop)
    shopId: number;

    @BelongsTo(() => Shop)
    shop: Shop;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @HasMany(() => OrderItem)
    orderItems: OrderItem[];
}
