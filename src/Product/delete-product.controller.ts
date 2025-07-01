import { Controller, Delete, HttpCode, NotFoundException, Param } from "@nestjs/common";
import { DeleteProductService } from "src/Product/delete-product.service";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

@Controller('/products')
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductService) {}

  @Delete(':id')
  @HttpCode(204)
  async handle(@Param() params: ParamsSchema) {
    const { id } = paramsSchema.parse(params);

    const success = await this.deleteProductService.execute({id});

    if (!success) {
      throw new NotFoundException('Product not found.');
    }
  }
}