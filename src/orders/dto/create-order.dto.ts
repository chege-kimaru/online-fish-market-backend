import { IsArray, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    total: number;
    @IsNotEmpty()
    shopId: number;
    @IsNotEmpty()
    @IsArray()
    orderItems: OrderItemDto[];
}

class OrderItemDto {
    @IsNotEmpty()
    productId: number;
    @IsNotEmpty()
    productPrice: number;
    @IsNotEmpty()
    quantity: number;
    @IsNotEmpty()
    total: number;
}