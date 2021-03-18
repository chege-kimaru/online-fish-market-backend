import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from 'src/shared/shared.module';
import { Shop } from './models/shop.model';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  imports: [SequelizeModule.forFeature([Shop]), SharedModule],
  controllers: [ShopsController],
  providers: [ShopsService]
})
export class ShopsModule { }
