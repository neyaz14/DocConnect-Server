import express, { NextFunction, Request, Response, Router } from 'express'
import { userController } from './user.controller';

 const router = Router();
console.log('inside the user router');
router.post(
    "/create-patient",
    userController.createPatient
)

export const userRouter = router