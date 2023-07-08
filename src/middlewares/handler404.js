import NotFoundError from "../errors/NotFoundError.js";

export default function handler404(req, res, next) {
  next(new NotFoundError());
}
