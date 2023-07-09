import NotFoundError from "../errors/NotFoundError.js";
import { books } from "../models/index.js";

export default class BooksController {

  static async findAllBooks(_, res, next) {
    try {
      const booksResult = await books.find().populate("author");
      res.status(200).json(booksResult);
    } catch (error) {
      next(error);
    }
  }

  static async findBookById(req, res, next) {
    try {
      const id = req.params.id;
      const book = await books.findById(id).populate("author", "name");
      if (book !== null) {
        res.status(200).json(book);
      } else {
        next(new NotFoundError("Livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async findBookByPublisher(req, res, next) {
    try {
      const publisher = req.query.publisher;
      const book = await books.find({"publisher": publisher}, {});
      if (book !== null) {
        res.status(200).json(book);
      } else {
        next(new NotFoundError("Livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async createBook(req, res, next) {
    try {
      const body = req.body;
      const book = await books.create(new books(body));
      res.status(201).json(book.toJSON());
    } catch (error) {
      next(error);
    }
  }

  static async updateBookById(req, res, next) {
    try {
      const id = req.params.id;
      const body = req.body;
      const book = await books.findByIdAndUpdate(id, { $set: body}, { returnDocument: "after" });
      if (book !== null) {
        res.status(200).json(book);
      } else {
        next(new NotFoundError("Livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookById(req, res, next) {
    try {
      const id = req.params.id;
      const book = await books.findByIdAndDelete(id);
      if (book !== null) {
        res.status(204).send();
      } else {
        next(new NotFoundError("Livro não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

}
