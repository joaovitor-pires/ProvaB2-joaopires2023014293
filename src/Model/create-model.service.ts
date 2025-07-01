import { BadRequestException, Injectable } from "@nestjs/common";
import { ModelsRepository } from "src/Model/models.repository";

interface CreateModelServiceRequest {
  name: string;
}

@Injectable()
export class CreateModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({
    name,
  }: CreateModelServiceRequest): Promise<void> {
    const modelWithSameName = await this.modelsRepository.findByName(name);

    if (modelWithSameName) {
      throw new BadRequestException('Model with same name already exists.');
    }

    await this.modelsRepository.create({ name });
  }
}