import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { id } = req.user;
  const result = await contactsService.listContacts({ owner: id });

  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.getContact({ id, owner });
  if (!result) {
    throw HttpError(404, "Contact not found");
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsService.removeContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { id } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner: id });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const result = await contactsService.updateContact({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId: id } = req.params;
  const { id: owner } = req.user;

  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const result = await contactsService.updateStatusContact(
    { id, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
