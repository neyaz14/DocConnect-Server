import { Router } from 'express';
import { userRouter } from '../modules/user/user.router';
import { authRoutes } from '../modules/auth/auth.routes';
import { ScheduleRoutes } from '../modules/schedule/sch.router';
import { doctorScheduleRoutes } from '../modules/doctorSchedule/docSch.router';
import { SpecialtiesRoutes } from '../modules/specialties/special.router';
import { DoctorRoutes } from '../modules/doctor/doctor.routes';


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
    },
    {
        path: '/doctor-schedule',
        route: doctorScheduleRoutes
    },
    {
         path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
         path: '/doctor',
        route: DoctorRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

// export default router;  