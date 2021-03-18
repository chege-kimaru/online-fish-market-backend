import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Product } from 'src/products/models/product.model';
import { Shop } from 'src/shops/models/shop.model';
import { User } from 'src/users/user.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './models/order-item.model';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order) private orderModel: typeof Order,
        @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
        @InjectModel(Shop) private shopModel: typeof Shop,
        private sequelize: Sequelize
    ) { }

    async getOrderById(orderId: number) {
        return this.orderModel.findByPk(orderId);
    }

    async createOrder(dto: CreateOrderDto, buyerId: number) {
        const transaction = await this.sequelize.transaction();
        try {
            if (!dto?.orderItems?.length) {
                throw new ForbiddenException('Cart cannot be empty');
            }
            const shop = await this.shopModel.findByPk(dto.shopId);
            const order = await this.orderModel.create({
                buyerId,
                shopId: dto.shopId,
                sellerId: shop.sellerId,
                status: 'pending',
                total: dto.total
            }, { transaction });
            for (const item of dto.orderItems) {
                await this.orderItemModel.create({
                    orderId: order.id,
                    productId: item.productId,
                    productPrice: item.productPrice,
                    quantity: item.quantity,
                    total: item.total
                }, { transaction });
            }
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    getBuyerOrders(buyerId: number) {
        return this.orderModel.findAll({
            where: { buyerId },
            order: [['createdAt', 'DESC']],
            include: [
                { model: OrderItem, include: [{ model: Product }] },
                { model: User, as: 'buyer' },
                { model: User, as: 'seller' },
                { model: Shop },
            ]
        });
    }

    getSellerOrders(sellerId: number) {
        return this.orderModel.findAll({
            where: { sellerId },
            order: [['createdAt', 'DESC']],
            include: [
                { model: OrderItem, include: [{ model: Product }] },
                { model: User, as: 'buyer' },
                { model: User, as: 'seller' },
                { model: Shop },
            ]
        });
    }

    deliver(order: Order) {
        return order.update({ status: 'delivered' });
    }
}
