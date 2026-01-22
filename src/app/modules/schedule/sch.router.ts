import express from "express";
import { UserRole } from "@prisma/client";
import { ScheduleController } from "./sch.controller";

import checkAuth from "../../middlewares/checkAuth";

const router = express.Router();

router.get(
    "/",
    checkAuth(UserRole.DOCTOR, UserRole.DOCTOR),
    ScheduleController.schedulesForDoctor
)

router.post(
    "/",
    ScheduleController.insertIntoDB
)


router.delete(
    "/:id",
    ScheduleController.deleteScheduleFromDB
)
export const ScheduleRoutes = router;