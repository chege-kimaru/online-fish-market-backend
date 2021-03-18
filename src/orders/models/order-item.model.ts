import {
    IsEmail,
    Column, CreatedAt,
    DataType,
    Default, IsUUID,
    Model,
    PrimaryKey,
    Table, Unique, UpdatedAt, BelongsToMany, HasOne, AllowNull, HasMany, BelongsTo, ForeignKey,
} from 'sequelize-typescript';
import { Product } from 'src/products/models/product.model';
import { Shop } from 'src/shops/models/shop.model';
import { User } from 'src/users/user.model';
import { Order } from './order.model';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {

    @PrimaryKey
    @Column
    id: number;

    @Column
    total: number;

    @Column
    quantity: number;

    @Column({ field: 'product_price' })
    productPrice: number;

    @Column({ field: 'order_id' })
    @ForeignKey(() => Order)
    orderId: number;

    @BelongsTo(() => Order, { foreignKey: 'order_id' })
    order: Order;

    @Column({ field: 'product_id' })
    @ForeignKey(() => Product)
    productId: number;

    @BelongsTo(() => Product, { foreignKey: 'product_id' })
    product: Product;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;
}
