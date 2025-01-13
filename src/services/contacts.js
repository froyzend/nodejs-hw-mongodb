import { ContactsCollection } from '../db/Models/contacts.js';

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
    console.log('contactId', contactId);
    const contact = await ContactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
