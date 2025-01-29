import { Router } from 'express';
import {
  getContactByIdController,
  getAllContactsController,
  createContactsController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get(
  '/contacts',
  ctrlWrapper(getAllContactsController),
  validateBody(createContactSchema),
);

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
  validateBody(createContactSchema),
);

router.post(
  '/contacts',

  ctrlWrapper(createContactsController),
  validateBody(createContactSchema),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
  validateBody(createContactSchema),
);

router.put(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(upsertContactController),
  validateBody(updateContactSchema),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(patchContactController),
  validateBody(updateContactSchema),
);

export default router;
