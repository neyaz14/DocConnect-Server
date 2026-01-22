import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod"
import AppError from "../../helpers/errorHelpers";

export const zodValidationRequest = (zodschema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Request body json ", req.body);
        if (req.body.data) {
            console.log("Request body file json ", req.body?.file);
            req.body = JSON.parse(req.body.data)
        }
        req.body = await zodschema.parseAsync(req.body)

        // await zodschema.parseAsync({
        //     body: req.body
        // })

        next()
    } catch (error) {
        console.log("Error from zodvalidaton ===>", error);
        // throw new AppError(401,"zod validation Error")
        next(error);
    }
}