import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchRecentModelsService } from "src/Model/fetch-recent-models.service";

@Controller('/models')
export class FetchRecentModelsController {
  constructor(private fetchRecentModelsService: FetchRecentModelsService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const models = await this.fetchRecentModelsService.execute();

    return {
      models
    };
  }
}