import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/authServices.js";
import { verifyToken } from "../helpers/jwt.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Authorization header must start with Bearer"));
  }

  const { payload, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, error.message));
  }
  const user = await findUser({ id: payload.id });

  if (!user || !user.token) {
    return next(HttpError(401, "User not found"));
  }
  req.user = user;
  next();
};

export default authenticate;
