import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CowRoutes } from '../modules/cows/cow.route';
import { OrdersRoutes } from '../modules/order/order.routes';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
