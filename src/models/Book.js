import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: [true, "O campo title é obrigatório"] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "O campo author é obrigatório"] },
  publisher: { 
    type: String,
    required: [true, "O campo publisher é obrigatório"],
    enum: {
      values: ["Casa do Código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido"
    }
  },
  pages: { 
    type: Number, 
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message: "O número de páginas deve ser um valor entre 10 e 5000"
    }
  },
});

const books = mongoose.model("books", bookSchema);

export default books;
