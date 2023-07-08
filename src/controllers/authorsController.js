import authors from "../models/Author.js";

export default class AuthorsController {

  static async findAllAuthors(_, res) {
    try {
      const authorsResult = await authors.find();
      res.status(200).json(authorsResult);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static async findAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const author = await authors.findById(id);
      if (author !== null) {
        res.status(200).json(author);
      } else {
        res
          .status(404)
          .json({ message: "Autor não encontrado." });
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
      res.status(200).json(authorUpdated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

}
