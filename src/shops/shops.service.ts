import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CloudinaryConfigService } from 'src/shared/cloudinary-config.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './models/shop.model';

@Injectable()
export class ShopsService {
    constructor(@InjectModel(Shop) private shopModel: typeof Shop,
        private cloudinaryConfigService: CloudinaryConfigService) {

    }

    getShopById(shopId) {
        return this.shopModel.findByPk(shopId);
    }

    async createShop(dto: CreateShopDto, image: any, sellerId: number) {
        const data: any = { ...dto };
        data.sellerId = sellerId;

        if (image) {
            const { fileId, fileUrl } =
                await this.cloudinaryConfigService.uploadBase64File(image.buffer, image.originalname, 'ofm');
            data.imageId = fileId;
            data.imageUrl = fileUrl;
        }

        return this.shopModel.create(data);
    }

    getShops() {
        return this.shopModel.findAll();
    }

    getSellerShops(sellerId) {
        return this.shopModel.findAll({ where: { sellerId } });
    }
}
