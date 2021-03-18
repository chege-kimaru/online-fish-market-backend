import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ShopsService } from './shops.service';
import { memoryStorage } from 'multer';
import { CreateShopDto } from './dto/create-shop.dto';

@Controller('shops')
export class ShopsController {
    constructor(private shopsService: ShopsService) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
    @Post()
    async createShop(@Req() req: any, @Body() createShopDto: CreateShopDto, @UploadedFile() image) {
        return this.shopsService.createShop(createShopDto, image, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('seller')
    async getSellerShops(@Req() req: any) {
        return this.shopsService.getSellerShops(req.user.id);
    }

    @Get()
    async getShops(@Req() req: any) {
        return this.shopsService.getShops();
    }
}
