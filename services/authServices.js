import bcrypt from "bcrypt";
import User from "../db/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

export const findUser = (query) => User.findOne({ where: query });

const { BASE_URL } = process.env;

const createVerificationEmail = (verificationToken, email) => {
  return {
    to: email,
    subject: "Please, verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };
};

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const verificationToken = nanoid();
  const newUser = await User.create({
    ...payload,
    password: hashPassword,
    verificationToken,
  });

  await sendEmail(createVerificationEmail(verificationToken, newUser.email));

  return newUser;
};

export const verifyEmail = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  return await user.update(
    { verify: true, verificationToken: null },
    { returning: true }
  );
};

export const resendVerificationEmail = async (email) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(createVerificationEmail(user.verificationToken, email));
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user.id,
  };

  const token = createToken(payload);
  user.token = token;
  await user.save();

  return {
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription || "starter",
    },
  };
};

export const logoutUser = async ({ email }) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "User not found");
  }
  user.token = null;
  await user.save();
};

export const updateAvatar = async (id, avatarURL) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw HttpError(404, "User not found");
  }
  user.avatarURL = avatarURL;
  await user.save();
  return user;
};
