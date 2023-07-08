import books from "../models/Book.js";

export default class BooksController {

  static async findAllBooks(_, res) {
    try {
      const booksResult = await books.find().populate("author");
      res.status(200).json(booksResult);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao buscar livros.` });
    }
  }

  static async findBookById(req, res) {
    try {
      const id = req.params.id;
      const book = await books.findById(id).populate("author", "name");
      res.status(200).json(book);
    } catch (error) {
      res.status(404).json({ message: `${error.message} - falha ao buscar livro.` });
    }
  }

  static async findBookByPublisher(req, res) {
    try {
      const publisher = req.query.publisher;
      const book = await books.find({"publisher": publisher}, {});
      res.status(200).json(book);
    } catch (error) {
      res.status(404).json({message: `${error.message} - livro não encontrado.`});
    }
  }

  static async createBook(req, res) {
    try {
      const body = req.body;
      const book = await books.create(new books(body));
      res.status(201).json(book.toJSON());
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar livro.` });
    }
  }

  static async updateBookById(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const book = await books.findByIdAndUpdate(id, { $set: body}, { returnDocument: "after" });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao atualizar livro.` });
    }
  }

  static async deleteBookById(req, res) {
    try {
      const id = req.params.id;
      await books.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: `${error.message} - falha ao deletar livro.` });
    }
  }

}
