import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BooksRepository } from './Book/books.repository';
import { CreateBookService } from './Book/create-book.service';
import { GetBookByIdService } from './Book/get-book-by-id.service';
import { EditBookService } from './Book/edit-book.service';
import { DeleteBookService } from './Book/delete-book.service';
import { CreateBookController } from './Book/create-book-controller';


@Module({
  imports: [],
  controllers: [CreateBookController],
  providers: [PrismaService, BooksRepository, CreateBookService, GetBookByIdService, EditBookService, DeleteBookService],
})
export class AppModule {}
