import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteModelService } from "src/Model/delete-model.service";

@Controller('/models/:id')
export class DeleteModelController {
  constructor(private deleteModelService: DeleteModelService) {}

  @Delete('id')
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    await this.deleteModelService.execute({
      id,
    });
  }
}