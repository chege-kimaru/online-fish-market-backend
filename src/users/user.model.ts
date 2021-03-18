import {
  IsEmail,
  Column, CreatedAt,
  DataType,
  Default, IsUUID,
  Model,
  PrimaryKey,
  Table, Unique, UpdatedAt, BelongsToMany, HasOne, AllowNull, HasMany,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {

  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Column
  phone: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
