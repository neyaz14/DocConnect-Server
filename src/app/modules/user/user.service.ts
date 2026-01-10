import { Request } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";

const createPatient = async (req: Request) => {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    console.log('hashed password --->', hashedpassword);
    // result variable টা try block এর বাইরে declare করুন
    let result;

    try {
        result = await prisma.$transaction(async (tnx) => {
            // User create করার সময় User মডেলের নাম চেক করুন
            await tnx.user.create({
                data: {
                    email: req.body.patient.email,
                    password: hashedpassword,
                    role: "PATIENT"
                }
            });

            // Patient create করে return করুন
            return await tnx.patient.create({
                data: req.body.patient
            });
        });
        console.log('result ===> ', result);
    } catch (error) {
        console.log(error);
        throw error; // error টা throw করা ভালো যাতে caller জানতে পারে
    }

    return result;
}

export const UserService = {
    createPatient
}