import { ContactsCollection } from '../db/Models/contacts.js';

export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const createContact = async (body) => {
  return await ContactsCollection.create(body);
};

export const deleteContact = async (contactId) => {
  return await ContactsCollection.findByIdAndDelete(contactId);
};

export const updateContact = async (contactId, body, options = {}) => {
  return await ContactsCollection.findByIdAndUpdate(contactId, body, {
    ...options,
    new: true,
  });
};
