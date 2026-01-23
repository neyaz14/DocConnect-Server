import { Request, Response } from "express";
import httpStatus from "http-status";
// import { SpecialtiesService } from "./specialties.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { SpecialtiesService } from "./special.service";
import { SpecialtiesValidtaion } from "./special.zodValidation";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    console.log('req body ===>',JSON.parse(req.body.data));
    const paylaod ={
        ...JSON.parse(req.body.data),
        icon : req?.file.path 
    };
    console.log('payload body ===>',paylaod);
    // req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data))
    const result = await SpecialtiesService.inserIntoDB(paylaod);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.getAllFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialties data fetched successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SpecialtiesService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialty deleted successfully',
        data: result,
    });
});

export const SpecialtiesController = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
};