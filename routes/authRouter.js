import express from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { authLoginSchema, authRegisterSchema } from "../schemas/authSchemas.js";

import authenticate from "../middleware/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.registerController
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  authControllers.loginController
);

authRouter.get("/current", authenticate, authControllers.currentController);

authRouter.post("/logout", authenticate, authControllers.logoutController);

export default authRouter;
