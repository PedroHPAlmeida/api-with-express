import NotFoundError from "../errors/NotFoundError.js";
import authors from "../models/Author.js";

export default class AuthorsController {

  static async findAllAuthors(_, res, next) {
    try {
      const authorsResult = await authors.find();
      res.status(200).json(authorsResult);
    } catch (error) {
      next(error);
    }
  }

  static async findAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const author = await authors.findById(id);
      if (author !== null) {
        res.status(200).json(author);
      } else {
        next(new NotFoundError("Autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async createAuthor(req, res, next) {
    try {
      const body = req.body;
      const author = await authors.create(new authors(body));
      res.status(201).json(author.toJSON());
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const body = req.body;
      const authorUpdated = await authors.findByIdAndUpdate(
        id,
        { $set: body },
        { returnDocument: "after" }
      );
      if (authorUpdated !== null) {
        res.status(200).json(authorUpdated);
      } else {
        next(new NotFoundError("Autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const author = await authors.findByIdAndDelete(id);
      if (author !== null) {
        res.status(204).send();
      } else {
        next(new NotFoundError("Autor não encontrado."));
      }
    } catch (error) {
      next(error);
    }
  }

}
