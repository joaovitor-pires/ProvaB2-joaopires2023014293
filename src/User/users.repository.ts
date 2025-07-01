import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) {}

    async delete(user: Prisma.UserUncheckedCreateInput): Promise<void> {
        await this.prisma.user.delete({
            where: {
            id: user.id?.toString(),
            },
        });
    }

    async save(data: Prisma.UserUncheckedUpdateInput): Promise<void> {
        await this.prisma.user.update({
            where: {
            id: data.id?.toString(),
            },
        data,
        });
    }

    async findManyRecent(): Promise<Prisma.UserUncheckedCreateInput[]> {
        return await this.prisma.user.findMany({
            orderBy: {
            updatedAt: 'desc',
            },
        });
    }

    async findById(id: string): Promise<Prisma.UserUncheckedCreateInput | null> {
        return this.prisma.user.findUnique({
            where: {
            id,
            },
        });
    }

    async findByEmail(email: string): Promise<Prisma.UserUncheckedCreateInput | null> {
        return this.prisma.user.findUnique({
            where: {
            email,
            },
        });
    }

    async create(data: Prisma.UserUncheckedCreateInput): Promise<void> {
        await this.prisma.user.create({
            data,
        });
    }
}
