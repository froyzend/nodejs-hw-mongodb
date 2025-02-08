import { ContactsCollection } from '../db/Models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';
import createHttpError from 'http-errors';
export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  console.log('getAllContacts service called'); //Перевірка, що сервіс викликається
  console.log('userId in service:', userId); // Перевірка userId в сервісі
  const limit = perPage;
  const skip = (page - 1) * perPage;
  let contactsQuery = ContactsCollection.find({ userId });
  console.log('contactsQuery', contactsQuery.getQuery());

  if (filter.type) {
    contactsQuery = contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery = contactsQuery
      .where('isFavourite')
      .equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find({ userId }).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

export const deleteContact = async (contactId, userId) => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  try {
    const result = await ContactsCollection.findOneAndUpdate(
      { _id: contactId, userId },
      payload,
      {
        ...options,
        new: true,
        runValidators: true, // Додати runValidators: true
      },
    );

    if (!result) {
      // Якщо контакт не знайдено, повертаємо помилку 404
      throw createHttpError(404, `Contact with id ${contactId} not found`);
    }

    return result;
  } catch (error) {
    // Обробляємо інші можливі помилки, наприклад, помилки валідації
    console.error('Error updating contact:', error);
    throw error;
  }
};
