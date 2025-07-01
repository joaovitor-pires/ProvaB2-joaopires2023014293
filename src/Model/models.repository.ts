import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ModelsRepository {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string): Promise<Prisma.ModelUncheckedCreateInput | null> {
    return await this.prisma.model.findUnique({
      where: {
        name,
      },
    });
  }

  async findManyRecent(): Promise<Prisma.ModelUncheckedCreateInput[] | null> {
    return await this.prisma.model.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Prisma.ModelUncheckedCreateInput | null> {
    return await this.prisma.model.findUnique({
      where: {
        id,
      }
    });
  }

  async save(data: Prisma.ModelUncheckedUpdateInput): Promise<void> {
    await Promise.all([
      this.prisma.model.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async create(data: Prisma.ModelUncheckedCreateInput): Promise<void> {
    await this.prisma.model.create({
      data,
    });
  }

  async delete(model: Prisma.ModelUncheckedCreateInput): Promise<void> {
    await this.prisma.model.delete({
      where: {
        id: model.id?.toString(),
      }
    });
  }
}