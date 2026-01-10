import catchAsync from "../../shared/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";

console.log('inside the controller');
const createPatient = catchAsync(async  (req: Request, res: Response) => {
    const result = await UserService.createPatient(req);
    console.log("result form controller  --> ",result);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result,
        // data: null
    })

})

export const userController = {
    createPatient
}