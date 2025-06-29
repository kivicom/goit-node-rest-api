import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import { updateContactSchema } from "../schemas/contactsSchemas.js";
import authenticate from "../middleware/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);
contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);
contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(updateStatusContactSchema),
  contactsControllers.updateStatusContact
);

export default contactsRouter;
