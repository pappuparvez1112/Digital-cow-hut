import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validations';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow,
);

router.get('/:id', CowController.getSingleCow);

router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCows,
);

router.delete('/:id', CowController.deleteCow);

router.get('/', CowController.getAllCows);

export const CowRoutes = router;
