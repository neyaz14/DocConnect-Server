import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod"

export const zodValidationRequest = (zodschema: AnyZodObject) =>async(req: Request, res:Response, next: NextFunction)=> {
    try {
        console.log("Request body json ",req.body);
        if(req.body){
            req.body = JSON.parse(req.body)
        }
        // req.body = await zodschema.pars 
    } catch (error) {
        console.log("Error from zodvalidaton",error);
    }
}