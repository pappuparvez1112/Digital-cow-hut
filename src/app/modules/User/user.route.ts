import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// router.get('/:id', AcademicSemesterController.getSingleSemester);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
