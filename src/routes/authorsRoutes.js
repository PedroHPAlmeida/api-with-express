import express from "express";
import AuthorController from "../controllers/authorsController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/authors", AuthorController.findAllAuthors, pagination)
  .get("/authors/:id", AuthorController.findAuthorById)
  .post("/authors", AuthorController.createAuthor)
  .put("/authors/:id", AuthorController.updateAuthorById)
  .delete("/authors/:id", AuthorController.deleteAuthorById);

export default router;
