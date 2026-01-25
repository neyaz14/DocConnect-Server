import express from "express";
import { AppointmentController } from "./appointment.controller";
// import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import checkAuth from "../../middlewares/checkAuth";

const router = express.Router();

router.post(
    "/",
    checkAuth(UserRole.PATIENT),
    AppointmentController.createAppointment
)

export const AppointmentRoutes = router; 