import books from "../models/Book.js";

export default class BooksController {
  static findAllBooks(_, res) {
    books
      .find()
      .populate("author")
      .exec((_, books) => {
        res.status(200).json(books);
      });
  }

  static findBookById(req, res) {
    books
      .findById(req.params.id)
      .populate("author", "name")
      .exec((err, book) => {
        if (err) {
          res
            .status(404)
            .json({ message: `${err.message} - falha ao buscar livro.` });
        } else {
          res.status(200).json(book);
        }
      });
  }


  static findBookByPublisher(req, res) {
    const publisher = req.query.publisher;
    books.find({"publisher": publisher}, {}, (_, book) => {
      res.status(200).json(book);
    });
  }

  static createBook(req, res) {
    const book = new books(req.body);
    book.save((err) => {
      if (err) {
        res
          .status(500)
          .json({ message: `${err.message} - falha ao cadastrar livro.` });
      } else {
        res.status(201).json(book.toJSON());
      }
    });
  }

  static updateBookById(req, res) {
    books.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: "after" },
      (err) => {
        if (!err) {
          res.status(204).send();
        } else {
          res
            .status(500)
            .json({ message: `${err.message} - falha ao atualizar livro.` });
        }
      }
    );
  }

  static deleteBookById(req, res) {
    books.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        res
          .status(404)
          .json({ message: `${err.message} - falha ao deletar livro.` });
      } else {
        res.status(204).send();
      }
    });
  }

}
