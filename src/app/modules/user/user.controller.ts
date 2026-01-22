import catchAsync from "../../shared/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import { ICreatePatientUserPayload } from "./user.interface";
import pick from "../../utils/pick";


const createPatient = catchAsync(async (req: Request, res: Response) => {
    // const file = req.file ;
    // file.originalname --> unique name 
    const payload: ICreatePatientUserPayload = {
        ...req.body,
        patient: {
            ...req.body.patient,
            profilePhoto: req.file.path
        }
    };
    const result = await UserService.createPatient(payload);
    console.log("req.body form controller  --> ", req.body);
    console.log("payload form controller  --> ", payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result,
        // data: null
    })

})


const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const options: Record<string, unknown> = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

    const filter = pick(req.query, ['status', 'role', 'email', 'searchTerm'])



    const allUser = await UserService.getAllUser(options, filter);
    console.log("all user from controller ");


    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "All user sent successfully",
        data: allUser,

    })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    console.log('req.body --> ', req.body);
    // 🔑 Parse JSON string
    const parsedData = JSON.parse(req.body.data);

    const payload = {
        data: parsedData,
        admin: {
            ...parsedData.admin,
            profilePhoto: req.file?.path
        }
    };

    console.log("final payload -->", payload);
    const result = await UserService.createAdmin(payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    // 🔑 Parse JSON string
    const parsedData = JSON.parse(req.body.data);

    const payload = {
        data: parsedData,
        doctor: {
            ...parsedData.admin,
            profilePhoto: req.file?.path
        }
    };
    console.log('parsed paylaod ', payload);
    const result = await UserService.createDoctor(payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});





export const userController = {
    createPatient, getAllUser, createAdmin, createDoctor
}