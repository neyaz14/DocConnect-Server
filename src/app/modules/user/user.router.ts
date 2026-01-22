import express, { NextFunction, Request, Response, Router } from 'express'
import { userController } from './user.controller';
import { multerUpload } from '../../../config/multer';
import { zodValidationRequest } from '../../middlewares/zodValidation';
import { UserValidation } from './user.zodvalidatoin';
import checkAuth from '../../middlewares/checkAuth';
import { UserRole } from '@prisma/client';

const router = Router();
// console.log('inside the user router');
router.post(
    "/create-patient",
    multerUpload.single('file'),
    zodValidationRequest(UserValidation.createPatientValidationSchema),
    userController.createPatient
)


router.get(
    "/",
    // checkAuth(UserRole.PATIENT),
    userController.getAllUser
)



router.post(
    "/create-admin",
    // auth(UserRole.ADMIN),
    multerUpload.single('file'),
    userController.createAdmin

);
router.post(
    "/create-doctor",
    // auth(UserRole.ADMIN),
    multerUpload.single('file'),
    userController.createDoctor

);

// router.post(
//     "/create-doctor",
//     // auth(UserRole.ADMIN),
//     multerUpload.upload.single('file'),
//     (req: Request, res: Response, next: NextFunction) => {
//         console.log(JSON.parse(req.body.data))
//         req.body = UserValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data))
//         return userController.createDoctor(req, res, next)
//     }
// );

export const userRouter = router; 