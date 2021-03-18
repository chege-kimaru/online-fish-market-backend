import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from 'src/shops/models/shop.model';
import { OrderItem } from './models/order-item.model';
import { Order } from './models/order.model';
import { OrdersController } from './orders.controller';
import { OrdersMiddleware } from './orders.middleware';
import { OrdersService } from './orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItem, Shop])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(OrdersMiddleware)
      .forRoutes({ method: RequestMethod.POST, path: 'orders/:orderId/deliver' })
  }
}
