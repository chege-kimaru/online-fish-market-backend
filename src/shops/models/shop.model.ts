import {
    IsEmail,
    Column, CreatedAt,
    DataType,
    Default, IsUUID,
    Model,
    PrimaryKey,
    Table, Unique, UpdatedAt, BelongsToMany, HasOne, AllowNull, HasMany, BelongsTo, ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table({ tableName: 'shops' })
export class Shop extends Model<Shop> {

    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @Column
    latitude: string;

    @Column
    longitude: string;

    @Column
    location: string;

    @Column
    county: string;

    @Column
    description: string;

    @Column({ field: 'image_id' })
    imageId: string;

    @Column({ field: 'image_url' })
    imageUrl: string;

    @Column({ field: 'seller_id' })
    @ForeignKey(() => User)
    sellerId: number;

    @BelongsTo(() => User)
    seller: User;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;
}
