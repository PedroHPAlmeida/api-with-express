import express from "express";
import BooksController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/books", BooksController.findAllBooks)
  .get("/books/filter", BooksController.findBooksByFilter)
  .get("/books/:id", BooksController.findBookById)
  .post("/books", BooksController.createBook)
  .put("/books/:id", BooksController.updateBookById)
  .delete("/books/:id", BooksController.deleteBookById);

export default router;
