import { Router } from 'express';
import MongooseUserRepository from '../../../../infrastructure/MongooseUserRepository';
import GetUserApplicationService, { GetUserCommand } from '../../../../application/user/getUserApplicationService/GetUserApplicationService';
import RegisterUserApplicationService, { RegisterUserCommand } from '../../../../application/user/registerUserApplicationService/RegisterUserApplicationService';
import UpdateUserApplicationService, { UpdateUserCommand } from '../../../../application/user/updateUserApplicationService/UpdateUserApplicationService';
import DeleteUserApplicationService, { DeleteUserCommand } from '../../../../application/user/deleteUserApplicationService/DeleteUserApplicationService';
import authenticateJWT from '../../../middleware/authMiddleware';

const userRouter = Router();
const repository = new MongooseUserRepository();

userRouter.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const getUserApplicationService = new GetUserApplicationService(repository);
        const getUserCommand: GetUserCommand = {
            userId: req.params.id,
        };
        const userDto = await getUserApplicationService.execute(getUserCommand);
        console.log(`userDto : ${JSON.stringify(userDto)}`);
        res.status(200).json({ user: userDto });
    } catch (error) {
        // res.status(404).json({ message: (error as Error).message });
        res.redirect('http://localhost:5173/auth');
    }
});

userRouter.post('/', async (req, res) => {
    try {
        const registerUserApplicationService = new RegisterUserApplicationService(repository);

        // console.log(req.body);

        const requestBody = req.body as {
            userName: string;
            userPassword: string;
            userImage: string;
        };

        const registerUserCommand: RegisterUserCommand = {
            user: requestBody,
        };

        await registerUserApplicationService.execute(registerUserCommand);

        res.status(200).json({ message: 'POST /users' });
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
});

userRouter.put('/:id', authenticateJWT, async (req, res) => {
    try {
        const updateUserApplicationService = new UpdateUserApplicationService(repository);
        const requestBody = req.body as {
            userId: string;
            userName: string;
            userPassword: string;
            userImage: string;
        };

        const updateUserCommand: UpdateUserCommand = {
            user: requestBody,
        };
        await updateUserApplicationService.execute(updateUserCommand);
        res.status(200).json({ message: 'PUT /users' });
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
});

userRouter.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const deleteUserApplicationService = new DeleteUserApplicationService(repository);
        const deleteUserCommand: DeleteUserCommand = {
            userId: req.params.id,
        };
        await deleteUserApplicationService.execute(deleteUserCommand);
        res.status(200).json({ message: 'DELETE /users' });
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
});

export default userRouter;
