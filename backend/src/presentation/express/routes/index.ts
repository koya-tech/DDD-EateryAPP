import { Router } from 'express';
import userRouter from './user/userRouter';
import eateryRouter from './eatery/eateryRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/eatery', eateryRouter);
// router.use('/eateryReview', eateryRouterReview);

export default router;
