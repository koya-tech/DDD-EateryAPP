import InMemoryUserRepository from '../../../infrastructure/shared/InMemoryUserRepository';
import RegisterUserApplicationService, { RegisterUserCommand } from './RegisterUserApplicationService';
import { sampleUser } from '../testUserData';

describe('RegisterUserApplicationService', () => {
    const repository = new InMemoryUserRepository();
    const registerUserApplicationService = new RegisterUserApplicationService(repository);
    const command: Required<RegisterUserCommand> = {
        user: sampleUser,
    };

    test('register user correctly', async () => {
        await registerUserApplicationService.execute(command);
        const createdUser = await repository.getById(sampleUser.userId);

        expect(createdUser).not.toBeNull();
        expect(createdUser).toEqual(sampleUser);
    });

    test('throw error if the same name user already exists in DB', async () => {
        await expect(registerUserApplicationService.execute(command)).rejects.toThrow();
    });
});
