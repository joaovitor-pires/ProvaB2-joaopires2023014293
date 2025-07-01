import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { z } from "zod";
import { GetUserByIdService } from "src/User/get-user-by-id.service";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

@Controller('/users/:id')
export class GetUserByIdController {
  constructor(private getUserByIdService: GetUserByIdService) {}

  @Get(':id')
  @HttpCode(200)
  async handle(@Param() params: ParamsSchema) {
    const { id } = paramsSchema.parse(params);

    const user = await this.getUserByIdService.execute(id);

    return { user };
  }
}
