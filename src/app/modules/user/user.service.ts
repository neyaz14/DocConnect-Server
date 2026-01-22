import { Request } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { ICreatePatientUserPayload, IPatientCreatePayload, UserFilterParams } from "./user.interface";
import pick from "../../utils/pick";
import { IOptions, paginationHelper } from "../../utils/paginationHelpers";
import AppError from "../../../helpers/errorHelpers";
import { allowedSortFields, userSearchAbleFields } from "./user.constant";
import { Admin, Doctor, Prisma, UserRole } from "@prisma/client";

const createPatient = async (payload: ICreatePatientUserPayload) => {
    const hashedpassword = await bcrypt.hash(payload?.password as string, 10);
    console.log('hashed password --->', hashedpassword);
    // result variable টা try block এর বাইরে declare করুন
    let result;

    try {
        result = await prisma.$transaction(async (tnx) => {
            // User create করার সময় User মডেলের নাম চেক করুন
            await tnx.user.create({
                data: {
                    email: payload.patient.email as string,
                    password: hashedpassword,
                    role: "PATIENT"
                }
            });

            // Patient create করে return করুন
            return await tnx.patient.create({
                data: { ...payload.patient }
            });
        });
        console.log('result ===> ', result);
    } catch (error) {
        console.log(error);
        throw new AppError(401, "Faced error while creating patient"); // error টা throw করা ভালো যাতে caller জানতে পারে
    }

    return result;
}

const getAllUser = async (
    params: UserFilterParams,
    options: IOptions
) => {
    // Pagination
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelper.calculatePagination(options);

    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.UserWhereInput[] = [];

    // 🔍 Search condition (OR)
    if (searchTerm) {
        andConditions.push({
            OR: userSearchAbleFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }

    // 🎯 Exact filters (AND)
    Object.entries(filterData).forEach(([key, value]) => {
        if (value !== undefined) {
            andConditions.push({
                [key]: value
            } as Prisma.UserWhereInput);
        }
    });

    // 🧠 Final where condition
    const whereConditions: Prisma.UserWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    // 🧾 Safe orderBy
    const orderBy: Prisma.UserOrderByWithRelationInput =
        allowedSortFields.includes(sortBy)
            ? { [sortBy]: sortOrder }
            : { createdAt: "desc" };

    // 📦 Data query
    const data = await prisma.user.findMany({
        skip,
        take: limit,
        where: whereConditions,
        orderBy
    });

    // 🔢 Total count
    const total = await prisma.user.count({
        where: whereConditions
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data
    };
};

const createDoctor = async (payload) => {
    // console.log("payload insdie the service ", payload.data.doctor);
    // console.log("payload insdie the service ", payload.doctor);

    const hashedPassword: string = await bcrypt.hash(payload.data.password as string, 10);
    console.log('hashed password --->', hashedPassword);
    const userData = {
        email: payload.data.doctor.email,
        password: hashedPassword,
        
        role: UserRole.DOCTOR
    }
    console.log('userData', userData);

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdDoctorData = await transactionClient.doctor.create({
            data: {...payload.doctor}
        });
        console.log('doctor data after transiction ', createdDoctorData);
        return createdDoctorData;
    });

    console.log('result data after transiction ', result);
    return result;
};



const createAdmin = async (payload) => {


    console.log("payload insdie the service ", payload);
    console.log("payload.data.password insdie the service ", payload.data.password);
    console.log("payload.data insdie the service ", payload.data);
    console.log("payload.data.admin insdie the service ", payload.data.admin);
    console.log("payload.admin insdie the service ", payload.admin);
    const hashedPassword: string = await bcrypt.hash(payload.data.password as string, 10);
    console.log('hashed password --->', hashedPassword);
    const userData = {
        email: payload.data.admin.email,
        password: hashedPassword,
        
        role: UserRole.ADMIN
    }
    console.log('userData', userData);

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: payload.admin
        });
        console.log('doctor data after transiction ', createdAdminData);
        return createdAdminData;
    });

    console.log('result data after transiction ', result);
    return result;
};

// const createDoctor = async (req: Request): Promise<Doctor> => {

//     // const file = req.file;

//     // if (file) {
//     //     const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
//     //     req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
//     // }
//     const hashedPassword: string = await bcrypt.hash(req.body.password, 10)
//     // console.log();
//     const userData = {
//         email: req.body.doctor.email,
//         password: hashedPassword,
//         role: UserRole.DOCTOR
//     }

//     const result = await prisma.$transaction(async (transactionClient) => {
//         await transactionClient.user.create({
//             data: userData
//         });

//         const createdDoctorData = await transactionClient.doctor.create({
//             data: req.body.doctor
//         });

//         console.log('doctor data after transiction ', createdDoctorData);
//         return createdDoctorData;
//     });
//     console.log('result data after transiction ', result);
//     return result;
// };




export const UserService = {
    createPatient, getAllUser, createAdmin, createDoctor
}