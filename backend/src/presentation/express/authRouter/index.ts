import { Router } from 'express';
import googleAuthRouter from './googleAuth/googleAuthRouter';

const authRouter = Router();

authRouter.use('/google', googleAuthRouter);

export default authRouter;
