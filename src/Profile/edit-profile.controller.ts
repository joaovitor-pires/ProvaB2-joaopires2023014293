import { Controller, HttpCode, Param, Put, Body, NotFoundException } from '@nestjs/common';
import { EditProfileService } from 'src/Profile/edit-profile.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const bodySchema = z.object({
  avatarUrl: z.string().url(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;
type BodySchema = z.infer<typeof bodySchema>;

const bodyValidationPipe = new ZodValidationPipe(bodySchema);

@Controller('/profiles/:id')
export class EditProfileController {
  constructor(private editProfileService: EditProfileService) {}

  @Put(':id')
  @HttpCode(204)
  async handle(
    @Param() params: ParamsSchema,
    @Body(bodyValidationPipe) body: BodySchema
  ) {
    const { id } = paramsSchema.parse(params);

    const success = await this.editProfileService.execute({
      id,
      avatarUrl: body.avatarUrl,
    });

    if (!success) {
      throw new NotFoundException('Profile not found.');
    }
  }
}
