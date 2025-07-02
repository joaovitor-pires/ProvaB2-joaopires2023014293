import { Injectable, NotFoundException } from "@nestjs/common";
import { BooksRepository } from "./books.repository";

interface EditBookServiceRequest {
  title:           string;
  author:          string;
  publicationYear: number;
  isbn:            string;
  id:              string;
}

@Injectable()
export class EditBookService {
  constructor(private booksRepository: BooksRepository) {}

    async execute({
        title,
        author,
        publicationYear,
        isbn,
        id,
    }: EditBookServiceRequest): Promise<void> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new NotFoundException("Book not found");
    }

    book.title = title;
    book.author = author;
    book.publicationYear = publicationYear;
    book.isbn = isbn;

    await this.booksRepository.save(book);
  }
}