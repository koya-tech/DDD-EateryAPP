import InMemoryUserRepository from '../../../infrastructure/shared/InMemoryUserRepository';
import { sampleUser } from '../testUserData';
import UserDTO from '../userDto';
import GetUserApplicationService, { GetUserCommand } from './GetUserApplicationService';

describe('GetUserApplicationService test', () => {
    const repository = new InMemoryUserRepository();
    const getUserApplicationService = new GetUserApplicationService(repository);
    const command: Required<GetUserCommand> = {
        user: sampleUser,
    };

    beforeEach(() => {
        repository.clean();
    });

    test('get user correctly', async () => {
        await repository.register(sampleUser);
        const sampleUserDto = new UserDTO(sampleUser);
        const user = await getUserApplicationService.execute(command);
        expect(user).toEqual(sampleUserDto);
    });

    test('throw error if user not found', async () => {
        await expect(getUserApplicationService.execute(command)).rejects.toThrow();
    });
});
