import InMemoryUserRepository from '../../../infrastructure/shared/InMemoryUserRepository';
import DeleteUserApplicationService from './DeleteUserApplicationService';
import RegisterUserApplicationService, { RegisterUserCommand } from '../registerUserApplicationService/RegisterUserApplicationService';
import { sampleUser } from '../testUserData';

describe('RegisterUserApplicationService', () => {
    const repository = new InMemoryUserRepository();
    const deleteUserApplicationService = new DeleteUserApplicationService(repository);

    const command: Required<RegisterUserCommand> = {
        user: sampleUser,
    };

    beforeEach(() => {
        repository.clean();
    });

    test('delete user correctly', async () => {
        const registerUserApplicationService = new RegisterUserApplicationService(repository);

        await registerUserApplicationService.execute(command);

        await deleteUserApplicationService.execute(command);
        const deletedUser = await repository.getById(sampleUser.userId);

        expect(deletedUser).toBeNull();
    });

    test('throw error if not exists in DB', async () => {
        await expect(deleteUserApplicationService.execute(command)).rejects.toThrow();
    });
});
