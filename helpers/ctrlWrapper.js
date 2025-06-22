import { ValidationError } from "sequelize";

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.status = 400;
      }
      next(error);
    }
  };
};

export default ctrlWrapper;
