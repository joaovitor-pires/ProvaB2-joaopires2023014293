import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async delete(book: Prisma.BookUncheckedUpdateInput): Promise<void> {
    await this.prisma.book.delete({
      where: {
        id: book.id?.toString(),
      }
    });
  }

  async save(data: Prisma.BookUncheckedUpdateInput): Promise<void> {
    await Promise.all([
      this.prisma.book.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async findByISBN(isbn: string): Promise<Prisma.BookUncheckedCreateInput | null> {
    return await this.prisma.book.findUnique({
      where: {
        isbn,
      }
    });
  }

  async findByTitle(title: string): Promise<Prisma.BookUncheckedCreateInput | null> {
    return await this.prisma.book.findUnique({
      where: {
        title,
      }
    });
  }

  async findById(id: string): Promise<Prisma.BookUncheckedCreateInput | null> {
    return await this.prisma.book.findUnique({
      where: {
        id,
      }
    });
  }

  async create(book: Prisma.BookUncheckedCreateInput): Promise<void> {
    await this.prisma.book.create({
      data: book,
    });
  }
}
