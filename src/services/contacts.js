import { ContactsCollection } from '../db/Models/contacts.js';
import mongoose from 'mongoose';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw new Error('Invalid contact ID');
    }
    console.log('contactId', contactId);
    const contact = await ContactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
