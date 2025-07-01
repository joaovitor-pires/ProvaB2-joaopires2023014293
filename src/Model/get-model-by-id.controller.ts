import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetModelByIdService } from "src/Model/get-model-by-id.service";

@Controller('/models/:id')
export class GetModelByIdController {
  constructor(private getModelByIdService: GetModelByIdService) {}

  @Get(':id')
  @HttpCode(200)
  async handle(@Param("id") id: string) {
    const model = await this.getModelByIdService.execute({
      id,
    });

    return {
      model
    };
  }
}