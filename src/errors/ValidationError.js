import BadRequestError from "./BadRequestError.js";

export default class ValidationError extends BadRequestError {

  constructor (err) {
    const errorMessages = Object.values(err.errors)
      .map(error => error.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${errorMessages}`);
  }

}