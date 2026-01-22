import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { setAuthCookie } from "../../utils/setCookies";

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);
    const { tokenInfo, needPasswordChange } = result;

    setAuthCookie(res, tokenInfo)


    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User loggedin successfully!",
        data: {
            needPasswordChange
        }
    })
})

export const AuthController = {
    login
}