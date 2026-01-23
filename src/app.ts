import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/errorHelpers/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { envVars } from './config/envVars';
import { uptime } from 'process';
import { timeStamp } from 'console';
// import router from './app/routes';
import { userRouter } from './app/modules/user/user.router';
import { router } from './app/routes';

const app: Application = express();
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));


// app.use(expressSession({
//     secret: envVars.EXPRESS_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/user', userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Server is running..",
        environment: envVars.NODE_ENV,
        uptime: process.uptime().toFixed(2) + " sec",
        timeStamp: new Date().toISOString()
    })
});

app.use('/api/v1', router)

app.use(globalErrorHandler);

app.use(notFound);

export default app;