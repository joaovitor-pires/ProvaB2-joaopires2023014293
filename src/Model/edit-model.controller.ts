import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { EditModelService } from "src/Model/edit-model.service";

const editModelBodySchema = z.object({
  name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editModelBodySchema);

type EditModelBodySchema = z.infer<typeof editModelBodySchema>;

@Controller('/models/:id')
export class EditModelController {
  constructor(private editModelService: EditModelService) {}

  @Put(':id')
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditModelBodySchema,
    @Param("id") id: string,
  ) {
    const {
      name,
    } = body;

    await this.editModelService.execute({
      name,
      id,
    });
  }
}