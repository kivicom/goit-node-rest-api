import Contact from "../db/Contact.js";
import User from "../db/User.js";

export const listContacts = (query) =>
  Contact.findAll({
    where: query,
    include: {
      model: User,
      as: "user",
      attributes: ["email", "subscription"],
    },
  });

export const getContact = (query) => Contact.findOne({ where: query });

export const removeContact = async (query) => {
  const contact = await getContact(query);
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

export const addContact = (data) => {
  return Contact.create(data);
};

export const updateContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;

  await contact.update(data);

  return contact;
};

export const updateStatusContact = async (query, body) => {
  const contact = await getContact(query);
  if (!contact) return null;

  await contact.update({ favorite: body.favorite });
  return contact;
};
