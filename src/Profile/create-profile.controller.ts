import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { CreateProfileService } from 'src/Profile/create-profile.service';

const createProfileSchema = z.object({
  userId: z.string().uuid(),
  avatarUrl: z.string().url(),
});

type CreateProfileBody = z.infer<typeof createProfileSchema>;

@Controller('/profiles')
export class CreateProfileController {
  constructor(private createProfileService: CreateProfileService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createProfileSchema)) body: CreateProfileBody) {
    const { userId, avatarUrl } = body;

    await this.createProfileService.execute({
      userId,
      avatarUrl,
    });
  }
}
