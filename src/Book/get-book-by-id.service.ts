import { Injectable, NotFoundException } from "@nestjs/common";
import { BooksRepository } from "./books.repository";

export interface Book {
    id: string;
    title:           string;
    author:          string;
    publicationYear: number;
    isbn:            string;
    createdAt: string | Date | undefined;
    updatedAt: string | Date | null | undefined;
}

interface GetBookByIdServiceRequest {
  id: string;
}

type GetBookByIdServiceResponse = {
  book: Book;
}

@Injectable()
export class GetBookByIdService {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    id,
  }: GetBookByIdServiceRequest): Promise<GetBookByIdServiceResponse> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new NotFoundException("Book not found");
    }

    const newBook: Book = {
        id: book.id?.toString() || "",
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publicationYear: book.publicationYear,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
    };

    return {
        book: newBook
    };
  }
}