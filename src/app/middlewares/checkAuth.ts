import { NextFunction, Request, Response } from "express";
import AppError from "../../helpers/errorHelpers";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../../config/envVars";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../shared/prisma";


const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.get("accessToken"); // in future maybe we will need a auth function
    if (!accessToken) {
        throw new AppError(403, "No Token Recieved")
    }
    console.log("access Token from checkauth ===>", accessToken);
    const verifiedToken = verifyToken(accessToken, envVars.JWT.ACCESS_SECRET) as JwtPayload
    const isUserExist = await prisma.user.findUnique({
        where: { email: verifiedToken.email }
    })

    if (!isUserExist) {
        throw new AppError(403, "User does not exist")
    }
    // if (!isUserExist.isVerified) {
    //     throw new AppError(403, "User is not verified")
    // }
    // if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
    //     throw new AppError(403, `User is ${isUserExist.isActive}`)
    // }
    // if (isUserExist.isDeleted) {
    //     throw new AppError(403, "User is deleted")
    // }

    if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!!")
    }
    req.user = verifiedToken

    next()
}

export default checkAuth;