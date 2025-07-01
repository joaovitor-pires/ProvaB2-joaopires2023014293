import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "src/Product/products.repository";

interface DeleteProductServiceRequest {
  id: string;
}

@Injectable()
export class DeleteProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: DeleteProductServiceRequest): Promise<boolean> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      return false
    }

    await this.productsRepository.delete(product);
    return true
  }
}