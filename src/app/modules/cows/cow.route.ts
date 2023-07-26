import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validations';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCows,
);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getAllCows,
);

export const CowRoutes = router;
