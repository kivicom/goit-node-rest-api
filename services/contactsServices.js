import Contact from "../db/Contact.js";

export const listContacts = () => Contact.findAll();

export const getContactById = (contactId) => Contact.findByPk(contactId);

export const removeContact = async (contactId) => {
  const contact = getContactById(contactId);
  if (!contact) return null;

  await contact.destroy();
  return contact;
};

export const addContact = (data) => {
  return Contact.create(data);
};

export const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update(data);

  return;
};

export const updateStatusContact = async (contactId, body) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update({ favorite: body.favorite });
  return contact;
};
