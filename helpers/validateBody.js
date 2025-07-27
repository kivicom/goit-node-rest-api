import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    console.log("Request body:", req.body);
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
