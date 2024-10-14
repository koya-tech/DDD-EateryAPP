import InMemoryUserRepository from '../../../infrastructure/shared/InMemoryUserRepository';
import { sampleUser } from '../testUserData';
import UserDto from '../userDto';
import GetUserApplicationService, { GetUserCommand } from './GetUserApplicationService';

describe('GetUserApplicationService test', () => {
    const repository = new InMemoryUserRepository();
    const getUserApplicationService = new GetUserApplicationService(repository);
    const command: Required<GetUserCommand> = {
        userId: sampleUser.userId.value,
    };

    beforeEach(() => {
        repository.clean();
    });

    test('get user correctly', async () => {
        await repository.register(sampleUser);
        const sampleUserDto = new UserDto(sampleUser);
        const user = await getUserApplicationService.execute(command);
        expect(user).toEqual(sampleUserDto);
    });

    test('throw error if user not found', async () => {
        await expect(getUserApplicationService.execute(command)).rejects.toThrow();
    });
});
