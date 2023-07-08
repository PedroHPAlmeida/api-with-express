import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequestError from "../errors/BadRequestError.js";
import ValidationError from "../errors/ValidationError.js";
import NotFoundError from "../errors/NotFoundError.js";

// eslint-disable-next-line no-unused-vars
export default function handler(err, req, res, next) {
  console.error(err);
  if (err instanceof mongoose.Error.CastError) {
    new BadRequestError().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
  } else if(err instanceof NotFoundError) {
    err.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
}
