import { UserStatus } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs";

import AppError from "../../../helpers/errorHelpers";
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../../config/envVars";

const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new AppError(401, "Password is incorrect!")
    }

    const accessToken = generateToken({ email: user.email, role: user.role }, envVars.JWT.ACCESS_SECRET, envVars.JWT.ACCESS_SALT);

    const refreshToken = generateToken({ email: user.email, role: user.role }, envVars.JWT.REFRESH_SECRET, envVars.JWT.REFRESH_SALT);

    return {
        tokenInfo: {
            accessToken,
            refreshToken,
        },
        needPasswordChange: user.needPasswordChange
    }
}

export const AuthService = {
    login
}