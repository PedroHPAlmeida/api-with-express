import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
export default function handler(err, req, res, next) {
  console.error(err);
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "O id fornecido está incorreto." });
  } else {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
}
