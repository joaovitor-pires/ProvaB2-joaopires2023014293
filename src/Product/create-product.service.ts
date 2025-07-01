import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductsRepository } from "src/Product/products.repository";
import { Category } from "@prisma/client";
import { ModelsRepository } from "src/Model/models.repository";

interface CreateProductServiceRequest {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
  modelId: string;
}

@Injectable()
export class CreateProductService {
  constructor(
    private productsRepository: ProductsRepository,
    private modelsRepository: ModelsRepository
  ) {}

  async execute({
    name,
    description,
    price,
    inStock,
    isAvailable,
    category,
    tags,
    modelId,
  }: CreateProductServiceRequest): Promise<void> {
    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName) {
      throw new BadRequestException("Product with same name already exists.");
    }

    const modelsWithSameId = await this.modelsRepository.findById(modelId);

    if (!modelsWithSameId) {
      throw new BadRequestException("Model with same id already does not exists.");
    }

    await this.productsRepository.create({
      name, 
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      models: {connect: {id: modelId}}
    });
    
  }
}