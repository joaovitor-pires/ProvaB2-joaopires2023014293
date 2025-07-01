import { Controller, Get, HttpCode, NotFoundException, Param } from '@nestjs/common';
import { z } from 'zod';
import { GetProfileByIdService } from 'src/Profile/get-profile-by-id.service';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

@Controller('/profiles/:id')
export class GetProfileByIdController {
  constructor(private getProfileByIdService: GetProfileByIdService) {}

  @Get(':id')
  @HttpCode(200)
  async handle(@Param() params: ParamsSchema) {
    const { id } = paramsSchema.parse(params);

    const profile = await this.getProfileByIdService.execute(id);

    if (!profile) {
      throw new NotFoundException('Profile not found.');
    }

    return profile;
  }
}
