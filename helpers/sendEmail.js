import nodemailer from "nodemailer";
import HttpError from "./HttpError.js";

const {
  UKR_NET_HOST,
  UKR_NET_PORT,
  UKR_NET_USER,
  UKR_NET_PASS,
  UKR_NET_SECURE,
} = process.env;

const transporter = nodemailer.createTransport({
  host: UKR_NET_HOST,
  port: parseInt(UKR_NET_PORT, 10),
  secure: UKR_NET_SECURE === "true",
  auth: {
    user: UKR_NET_USER,
    pass: UKR_NET_PASS,
  },
});

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: `Contacts Api ${UKR_NET_USER}`,
  };
  try {
    const result = await transporter.sendMail(email);
    return result;
  } catch (error) {
    console.error("SendMail error:", error);
    throw HttpError(
      500,
      "Verification email sending failed. Please request email re-sending."
    );
  }
};

export default sendEmail;
