import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validations';

const router = express.Router();

router.post(
  '/create-cow',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow,
);

// router.get('/:id', AcademicFacultyController.getSingleFaculty);

// router.patch(
//   '/:id',
//   validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
//   AcademicFacultyController.updateFaculty,
// );

// router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', CowController.getAllCows);

export const CowRoutes = router;
