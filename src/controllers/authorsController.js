import authors from "../models/Author.js";

export default class AuthorsController {
  static findAllAuthors(_, res) {
    authors.find((_, authors) => {
      res.status(200).json(authors);
    });
  }

  static findAuthorById(req, res) {
    authors.findById(req.params.id, (err, author) => {
      if (err) {
        res
          .status(404)
          .json({ message: `${err.message} - falha ao buscar autor.` });
      } else {
        res.status(200).json(author);
      }
    });
  }

  static createAuthor(req, res) {
    const author = new authors(req.body);
    author.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: `${err.message} - falha ao cadastrar autor.` });
      } else {
        res.status(201).json(author.toJSON());
      }
    });
  }

  static updateAuthorById(req, res) {
    authors.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: "after" },
      (err) => {
        if (!err) {
          res.status(204).send();
        } else {
          res
            .status(500)
            .json({ message: `${err.message} - falha ao atualizar autor.` });
        }
      }
    );
  }

  static deleteAuthorById(req, res) {
    authors.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        res
          .status(404)
          .json({ message: `${err.message} - falha ao deletar autor.` });
      } else {
        res.status(204).send();
      }
    });
  }
}
