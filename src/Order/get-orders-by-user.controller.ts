import { Controller, Get, Param } from "@nestjs/common";
import { z } from "zod";
import { GetOrdersByUserService } from "src/Order/get-orders-by-user.service";

const paramsSchema = z.object({
    userId: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

@Controller('/users/:userId/orders')
export class GetOrdersByUserController {
    constructor(private getOrdersByUserService: GetOrdersByUserService) {}

    @Get(':userId/orders')
    async handle(@Param() params: ParamsSchema) {
        const { userId } = paramsSchema.parse(params);

        const result = await this.getOrdersByUserService.execute(userId);

        return result;
    }
}
