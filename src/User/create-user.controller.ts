import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateUserService } from "src/User/create-user.service";

const bodySchema = z.object({
  email: z.string().email(),
});

type BodySchema = z.infer<typeof bodySchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(bodySchema)) body: BodySchema) {
    const { email } = body;
    
    await this.createUserService.execute({ email });
  }
}
