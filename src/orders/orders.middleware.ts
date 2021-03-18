import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Injectable()
export class OrdersMiddleware implements NestMiddleware {

  constructor(private ordersService: OrdersService) { }

  async use(req: any, res: any, next: () => void) {
    try {
      const order = await this.ordersService.getOrderById(req.params.orderId);
      if (!order) {
        throw new NotFoundException('This order doe not exist');
      }
      req.order = order;
      next();
    } catch (e) {
      throw e;
    }
  }
}
