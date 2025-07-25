import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import "./db/associates.js"; // Ensure associations are set up

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running. Use our API on port: ${port}.");
});
