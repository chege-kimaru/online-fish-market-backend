import {
    IsEmail,
    Column, CreatedAt,
    DataType,
    Default, IsUUID,
    Model,
    PrimaryKey,
    Table, Unique, UpdatedAt, BelongsToMany, HasOne, AllowNull, HasMany, BelongsTo, ForeignKey,
} from 'sequelize-typescript';
import { Shop } from 'src/shops/models/shop.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {

    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @Column
    price: number;

    @Column
    description: string;

    @Column({ field: 'image_id' })
    imageId: string;

    @Column({ field: 'image_url' })
    imageUrl: string;

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
}
