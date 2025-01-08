import { Router } from 'express';
import eateryRouter from './eatery/eateryRouter';

const router = Router();

router.use('/eatery', eateryRouter);

export default router;
