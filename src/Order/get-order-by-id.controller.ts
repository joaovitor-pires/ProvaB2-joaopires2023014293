import { Controller, Get, HttpCode, NotFoundException, Param } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { GetOrderByIdService } from 'src/Order/get-order-by-id.service';

const paramsSchema = z.object({
    id: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

const paramsValidationPipe = new ZodValidationPipe(paramsSchema);

@Controller('/orders/:id')
export class GetOrderByIdController {
    constructor(private getOrderByIdService: GetOrderByIdService) {}

    @Get(':id')
    @HttpCode(200)
    async handle(@Param(paramsValidationPipe) params: ParamsSchema) {
        const { id } = params;

        const order = await this.getOrderByIdService.execute({ id });

        if (!order) {
            throw new NotFoundException('Order not found.');
        }

        return { order };
    }
}
