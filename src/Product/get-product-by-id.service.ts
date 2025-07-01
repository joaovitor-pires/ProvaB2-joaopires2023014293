import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "src/Product/products.repository";
import { Category } from "@prisma/client";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: Boolean;
  category: Category;
  tags: string[];
  modelId: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface GetProductByIdServiceRequest {
  id: string;
}

type GetProductByIdServiceResponse = {
  product: Product;
}

@Injectable()
export class GetProductByIdService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: GetProductByIdServiceRequest): Promise<GetProductByIdServiceResponse> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const newProduct: Product = {
      id: product.id?.toString() || "",
      name: product.name,
      description: product.description as string,
      price: product.price,
      inStock: product.inStock,
      isAvailable: !!product.isAvailable,
      category: product.category,
      tags: product.tags as string[],
      modelId: product.id?.toString() || "",
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return {
      product: newProduct
    };
  }
}