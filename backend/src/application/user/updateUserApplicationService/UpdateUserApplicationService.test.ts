import InMemoryUserRepository from '../../../infrastructure/shared/InMemoryUserRepository';
import UpdateUserApplicationService, { UpdateUserCommand } from './UpdateUserApplicationService';
import RegisterUserApplicationService, { RegisterUserCommand } from '../registerUserApplicationService/RegisterUserApplicationService';
import { sampleUser, updateUser } from '../testUserData';

describe('UpdateUserApplicationService', () => {
    const repository = new InMemoryUserRepository();
    const registerUserApplicationService = new RegisterUserApplicationService(repository);
    const updateUserApplicationService = new UpdateUserApplicationService(repository);
    const commandForSample: Required<RegisterUserCommand> = {
        user: {
            userName: sampleUser.userName.value,
            userPassword: sampleUser.userPassword.value,
            userImage: sampleUser.userImage.value,
        },
    };
    const commandForUpdate: Required<UpdateUserCommand> = {
        user: {
            userId: updateUser.userId.value,
            userName: updateUser.userName.value,
            userPassword: updateUser.userPassword.value,
            userImage: updateUser.userImage.value,
        },
    };

    beforeEach(() => {
        repository.clean();
    });

    test('can update user', async () => {
        await registerUserApplicationService.execute(commandForSample);

        await updateUserApplicationService.execute(commandForUpdate);
        const updatedUser = await repository.getById(updateUser.userId);

        expect(updatedUser).toEqual(updateUser);
    });

    test('throw error if user not found', async () => {
        await expect(updateUserApplicationService.execute(commandForUpdate)).rejects.toThrow();
    });
});
