import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchRecentProductsService } from "src/Product/fetch-recent-products.service";

@Controller('/products')
export class FetchRecentProductsController {
  constructor(private fetchRecentProductsService: FetchRecentProductsService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const products = await this.fetchRecentProductsService.execute();

    return {
      products
    };
  }
}
