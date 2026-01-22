import { JwtPayload } from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            user: JwtPayload,
            // file : File
        }
    }
}

// declare global {
//     namespace Express {
//         interface Request {
//             user: JwtPayload
//         }
//     }
// }