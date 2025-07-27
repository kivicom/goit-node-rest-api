import { rename } from "node:fs/promises";
import { join, resolve } from "node:path";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";
import gravatar from "gravatar";

const avatarsDir = resolve("public", "avatars");

const registerController = async (req, res) => {
  let avatarURL = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = join(avatarsDir, filename);
    await rename(oldPath, newPath);
    avatarURL = join("avatars", filename);
  } else {
    avatarURL = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
  }
  const newUser = await authServices.registerUser({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export const verifyEmailController = async (req, res) => {
  const { verificationToken } = req.params;
  await authServices.verifyEmail(verificationToken);
  res.json({
    message: "Verification successful",
  });
};

export const resendVerificationEmailController = async (req, res) => {
  const { email } = req.body;
  await authServices.resendVerificationEmail(email);
  res.json({
    message: "Verification email sent",
  });
};

const loginController = async (req, res) => {
  const user = await authServices.loginUser(req.body);

  res.json(user);
};

const currentController = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);

  res.status(204).send();
};

const updateAvatarController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Avatar file is required" });
  }

  const { path: oldPath, filename } = req.file;
  const newPath = join(avatarsDir, filename);
  await rename(oldPath, newPath);

  const avatarURL = join("avatars", filename);
  const updatedUser = await authServices.updateAvatar(req.user.id, avatarURL);

  res.status(200).json({
    avatarURL: updatedUser.avatarURL,
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  verifyEmailController: ctrlWrapper(verifyEmailController),
  resendVerificationEmailController: ctrlWrapper(
    resendVerificationEmailController
  ),
  loginController: ctrlWrapper(loginController),
  currentController: ctrlWrapper(currentController),
  logoutController: ctrlWrapper(logoutController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
};
