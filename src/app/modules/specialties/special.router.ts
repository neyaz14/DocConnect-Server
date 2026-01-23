import express, { NextFunction, Request, Response } from 'express';
// import { SpecialtiesController } from './specialties.controller';
// import { SpecialtiesValidtaion } from './specialties.validation';
// import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
// import { fileUploader } from '../../helper/fileUploader';
import { multerUpload } from '../../../config/multer';
import { SpecialtiesController } from './special.controller';
import { zodValidationRequest } from '../../middlewares/zodValidation';
import { SpecialtiesValidtaion } from './special.zodValidation';
import checkAuth from '../../middlewares/checkAuth';


const router = express.Router();


// Task 1: Retrieve Specialties Data

/**
- Develop an API endpoint to retrieve all specialties data.
- Implement an HTTP GET endpoint returning specialties in JSON format.
- ENDPOINT: /specialties
*/
router.get(
    '/',
    SpecialtiesController.getAllFromDB
);

router.post(
    '/',
    // fileUploader.upload.single('file'),
    multerUpload.single('file'),
    // zodValidationRequest(SpecialtiesValidtaion.create),
    SpecialtiesController.inserIntoDB
    // (req: Request, res: Response, next: NextFunction) => {
    //     req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data))
    //     return SpecialtiesController.inserIntoDB(req, res, next)
    // }
);



// Task 2: Delete Specialties Data by ID

/**
- Develop an API endpoint to delete specialties by ID.
- Implement an HTTP DELETE endpoint accepting the specialty ID.
- Delete the specialty from the database and return a success message.
- ENDPOINT: /specialties/:id
*/

router.delete(
    '/:id',
    checkAuth(UserRole.ADMIN, UserRole.DOCTOR),
    SpecialtiesController.deleteFromDB
);

export const SpecialtiesRoutes = router;