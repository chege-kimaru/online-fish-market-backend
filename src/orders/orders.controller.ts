import { Body, Controller, ForbiddenException, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(@Req() req: any, @Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(createOrderDto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('buyer')
    async getBuyerOrders(@Req() req: any) {
        return this.ordersService.getBuyerOrders(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('seller')
    async getSellerOrders(@Req() req: any) {
        return this.ordersService.getSellerOrders(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':orderId/deliver')
    async deliver(@Req() req: any) {
        if (req.order.sellerId !== req.user.id) {
            throw new ForbiddenException('You cannot deliver an order not from your shop');
        }
        return this.ordersService.deliver(req.order);
    }
}
