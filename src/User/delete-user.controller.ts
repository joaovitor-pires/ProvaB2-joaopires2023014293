import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { z } from 'zod';
import { DeleteUserService } from 'src/User/delete-user.service';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

@Controller('/users')
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  @Delete(':id')
  @HttpCode(204)
  async handle(@Param() params: ParamsSchema) {
    const { id } = paramsSchema.parse(params);

    const success = await this.deleteUserService.execute(id);

    if (!success) {
      throw new Error('User not found.');
    }
  }
}
