import Joi from "joi";

import { emmailRegexp } from "../costants/auth.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emmailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emmailRegexp).required(),
  password: Joi.string().min(6).required(),
});
