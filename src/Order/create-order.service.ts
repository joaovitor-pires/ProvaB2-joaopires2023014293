import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

interface OrderItemInput {
    productId: string;
    quantity: number;
}

interface CreateOrderServiceRequest {
    userId: string;
    orderItems: OrderItemInput[];
}

@Injectable()
export class CreateOrderService {
    constructor(private prisma: PrismaService) {}

    async execute({ userId, orderItems }: CreateOrderServiceRequest): Promise<void> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const productIds = orderItems.map(item => item.productId);

        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        const productsMap = new Map(products.map(p => [p.id, p]));

        for (const item of orderItems) {
            const product = productsMap.get(item.productId);

            if (!product) {
                throw new NotFoundException(`Product not found for item: ${item.productId}.`);
            }

            if (product.inStock < item.quantity) {
                throw new BadRequestException(`Insufficient stock for product: ${item.productId}.`);
            }
        }

        const total = orderItems.reduce((acc, item) => {
            const product = productsMap.get(item.productId)!;
            return acc + product.price * item.quantity;
        }, 0);

        await this.prisma.$transaction(async prisma => {
            const order = await prisma.order.create({
                data: {
                userId,
                total,
                },
            });

            for (const item of orderItems) {
                const product = productsMap.get(item.productId)!;

                await prisma.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                    },
                });

                await prisma.product.update({
                    where: { id: item.productId },
                        data: {
                            inStock: product.inStock - item.quantity,
                        },
                });
            }
        });
    }
}
