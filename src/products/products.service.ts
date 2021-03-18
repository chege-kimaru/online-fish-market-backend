import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CloudinaryConfigService } from 'src/shared/cloudinary-config.service';
import { Shop } from 'src/shops/models/shop.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product) private productModel: typeof Product,
        @InjectModel(Shop) private shopModel: typeof Shop,
        private cloudinaryConfigService: CloudinaryConfigService) {

    }

    getProductById(productId) {
        return this.productModel.findByPk(productId);
    }

    getShopById(shopId) {
        return this.shopModel.findByPk(shopId);
    }

    async createProduct(dto: CreateProductDto, image: any, shop: Shop, sellerId: number) {
        if (shop.sellerId !== sellerId) {
            throw new UnauthorizedException('You cannot add products to a shop that is not yours.');
        }

        const data: any = { ...dto };
        data.shopId = shop.id;

        if (image) {
            const { fileId, fileUrl } =
                await this.cloudinaryConfigService.uploadBase64File(image.buffer, image.originalname, 'ofm');
            data.imageId = fileId;
            data.imageUrl = fileUrl;
        }

        return this.productModel.create(data);
    }

    getShopProducts(shopId) {
        return this.productModel.findAll({ where: { shopId } });
    }
}
