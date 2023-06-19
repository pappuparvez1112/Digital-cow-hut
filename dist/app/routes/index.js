'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const user_route_1 = require('../modules/User/user.route');
const auth_route_1 = require('../modules/auth/auth.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: auth_route_1.AuthRoutes,
  },
  {
    path: '/user',
    route: user_route_1.UserRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
// router.use('/api/v1/users/', UserRoutes);
// router.use('/api/v1/academic-semester', SemesterRoutes);
exports.default = router;
