import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "src/Product/products.repository";

interface UpdateAvailableProductServiceRequest {
  isAvailable: boolean;
  id: string;
}

@Injectable()
export class UpdateAvailableProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
    isAvailable,
  }: UpdateAvailableProductServiceRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    product.isAvailable = isAvailable;

    await this.productsRepository.save(product);
  }
}