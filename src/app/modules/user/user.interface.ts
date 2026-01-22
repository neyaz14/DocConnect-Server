import { UserRole } from "@prisma/client";

export interface IcreatePatientInput {
    name: string;
    email: string;
    password: string;
}

export interface ICreatePatientUserPayload {
    password: string;
    patient : IPatientCreatePayload
}

export interface IPatientCreatePayload {
  
        name: string;
        email: string; 
        profilePhoto: string;
        address? : string   
}
 
export type UserFilterParams = {
  searchTerm?: string;
  role?: UserRole;
  isActive?: boolean;
};
