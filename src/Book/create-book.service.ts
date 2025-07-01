import { ConflictException, Injectable } from "@nestjs/common";
import { BooksRepository } from "./books.repository";

interface CreateBookServiceRequest {
  title:           string;
  author:          string;
  publicationYear: number;
  isbn:            string;
}

@Injectable()
export class CreateBookService {
  constructor(
    private booksRespository: BooksRepository) {}

  async execute({
    title,
    author,
    publicationYear,
    isbn,
  }: CreateBookServiceRequest): Promise<void> {
    const bookWithSameTitle = await this.booksRespository.findByTitle(title);

    if (bookWithSameTitle) {
      throw new ConflictException("Book with same title already exists.");
    }

    const bookWithSameISBN = await this.booksRespository.findByISBN(isbn);

    if (bookWithSameISBN) {
      throw new ConflictException("Book with same ISBN already exists.");
    }

    await this.booksRespository.create({
        title,
        author,
        publicationYear,
        isbn,
    });
    
  }
}