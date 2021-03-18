import { Injectable, Logger, NestMiddleware, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products.service';

@Injectable()
export class ShopMiddleware implements NestMiddleware {
  constructor(private productsService: ProductsService) { }

  async use(req: any, res: any, next: () => void) {
    try {
      const shop = await this.productsService.getShopById(req.params.shopId);
      if (!shop) {
        throw new NotFoundException('This shop does not exist');
      }
      req.shop = shop;
      next();
    } catch (e) {
      throw e;
    }
  }
}
