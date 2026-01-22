import  { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { authRoutes } from '../modules/auth/auth.routes';


export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

// export default router;  