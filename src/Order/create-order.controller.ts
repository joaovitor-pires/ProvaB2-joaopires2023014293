import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { z } from 'zod';
import { CreateOrderService } from 'src/Order/create-order.service';

const createOrderSchema = z.object({
    userId: z.string().uuid(),
    orderItems: z.array(z.object({
        productId: z.string().uuid(),
        quantity: z.number().positive(),
    })),
});

type CreateOrderBody = z.infer<typeof createOrderSchema>;

@Controller('/orders')
export class CreateOrderController {
    constructor(private createOrderService: CreateOrderService) {}

    @Post()
    @HttpCode(201)
    async handle(@Body(new ZodValidationPipe(createOrderSchema)) body: CreateOrderBody) {
        await this.createOrderService.execute(body);
    }
}
