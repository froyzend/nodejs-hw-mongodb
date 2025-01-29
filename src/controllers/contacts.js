import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import {
  getContactById,
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createHttpError(400, 'Invalid contact ID');
    }
    const contact = await getContactById(contactId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createContactsController = async (req, res, next) => {
  try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: `Successfully created a contact!`,
      data: contact,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);
    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 200,
      message: `Successfully deleted a contact with id ${contactId}!`,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const upsertContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body, {
      upsert: true,
      new: true,
    });

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
      status,
      message: `Successfully upserted a contact!`,
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body, { new: true });

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully patched a contact!`,
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
