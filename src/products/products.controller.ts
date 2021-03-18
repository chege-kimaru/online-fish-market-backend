import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { memoryStorage } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('shops/:shopId/products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
    @Post()
    async createProduct(@Req() req: any, @Body() createProductDto: CreateProductDto, @UploadedFile() image) {
        return this.productsService.createProduct(createProductDto, image, req.shop, req.user.id);
    }

    @Get()
    async getShopProducts(@Req() req: any) {
        return this.productsService.getShopProducts(req.shop.id);
    }

    @Get(':productId')
    async getProductDetails(@Req() req: any) {
        return this.productsService.getProductById(req.params.productId);
    }
}
