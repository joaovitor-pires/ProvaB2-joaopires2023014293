import { Controller, HttpCode, Param, Put, Body } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { EditUserService } from 'src/User/edit-user.service';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const bodySchema = z.object({
  email: z.string().email(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;
type BodySchema = z.infer<typeof bodySchema>;

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Controller('/users')
export class EditUserController {
  constructor(private editUserService: EditUserService) {}

  @Put(':id')
  @HttpCode(204)
  async handle(
    @Param() params: ParamsSchema,
    @Body(bodyValidationPipe) body: BodySchema,
  ) {
    const { id } = paramsSchema.parse(params);
    const { email } = body;

    await this.editUserService.execute({ id, email });
  }
}
