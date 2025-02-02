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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);
router.get(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(getAllContactsController),
);

router.get(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/register',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);
router.delete(
  '/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
