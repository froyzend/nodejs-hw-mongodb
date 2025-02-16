import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(6).max(16).required(),
  contactType: Joi.string().valid('personal', 'work', 'home').required(),
  isFavourite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(6).max(16),
  contactType: Joi.string().valid('personal', 'work', 'home'),
  isFavourite: Joi.boolean(),
});
