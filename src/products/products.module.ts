import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from 'src/shared/shared.module';
import { Shop } from 'src/shops/models/shop.model';
import { ShopMiddleware } from './middleware/shop.middleware';
import { Product } from './models/product.model';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, Shop]), SharedModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ShopMiddleware).forRoutes(ProductsController);
  }
}
