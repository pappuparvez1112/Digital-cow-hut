import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';

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
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/api/v1/users/', UserRoutes);
// router.use('/api/v1/academic-semester', SemesterRoutes);

export default router;
