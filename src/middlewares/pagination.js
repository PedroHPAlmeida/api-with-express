import BadRequestError from "../errors/BadRequestError.js";

export default async function pagination(req, res, next) {
  try {
    let { limit = 5, page = 1, order = "_id:-1"} = req.query;

    let [orderBy, direction] = order.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    direction = parseInt(direction);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const paginatedResult = await result.find()
        .sort({ [orderBy]: direction })
        .skip(((page - 1) * limit))
        .limit(limit);
      res.status(200).json(paginatedResult);
    } else {
      next(new BadRequestError());
    }
  } catch (error) {
    next(error);
  }
}
