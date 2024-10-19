import InMemoryEateryRepository from '../../../infrastructure/shared/InMemoryEateryRepository';
import { sampleEatery, sampleEateryFromClient } from '../testEateryData';
import RegisterEateryApplicationService, { RegisterEateryCommand } from './RegisterEateryApplicationService';

describe('RegisterEateryApplicationService', () => {
    const repository = new InMemoryEateryRepository();
    const registerEateryApplicationService = new RegisterEateryApplicationService(repository);

    const registerCommand: Required<RegisterEateryCommand> = {
        eatery: sampleEateryFromClient,
    };

    beforeEach(async () => {
        await repository.clean();
    });

    test('register eatery correctly', async () => {
        await registerEateryApplicationService.execute(registerCommand);
        const createdEatery = await repository.get();

        expect(createdEatery).not.toBeNull();
        if (createdEatery === null) {
            throw new Error('createdEatery is null');
        }
        expect(createdEatery[0]).toEqual(sampleEatery);
    });

    // test('throw error if the same name eatery already exists in DB', async () => {
    //     await registerEateryApplicationService.execute(registerCommand);

    //     await expect(registerEateryApplicationService.execute(registerCommand))
    // .rejects.toThrow();
    // });
});
