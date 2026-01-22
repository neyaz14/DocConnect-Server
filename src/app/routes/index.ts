import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { authRoutes } from '../modules/auth/auth.routes';
import { ScheduleRoutes } from '../modules/schedule/sch.router';


export const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

// export default router;  