import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CowRoutes } from '../modules/cows/cow.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/cow',
    route: CowRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/api/v1/users/', UserRoutes);
// router.use('/api/v1/academic-semester', SemesterRoutes);

export default router;
