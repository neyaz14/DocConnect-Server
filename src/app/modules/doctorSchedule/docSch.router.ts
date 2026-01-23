import express from "express";
// import { DoctorScheduleController } from "./doctorSchedule.controller";
// import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import checkAuth from "../../middlewares/checkAuth";
import { DoctorScheduleController } from "./docSch.controller";

const router = express.Router();

router.post(
    "/",
    checkAuth(UserRole.DOCTOR),
    DoctorScheduleController.insertIntoDB
)

export const doctorScheduleRoutes = router;