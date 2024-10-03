import InMemoryEateryRepository from '../../../infrastructure/shared/InMemoryEateryRepository';
import { sampleEatery } from '../testEateryData';
import RegisterEateryApplicationService, { RegisterEateryCommand } from './RegisterEateryApplicationService';

describe('RegisterEateryApplicationService', () => {
    const repository = new InMemoryEateryRepository();
    const registerEateryApplicationService = new RegisterEateryApplicationService(repository);

    const command: Required<RegisterEateryCommand> = {
        eatery: sampleEatery,
    };

    beforeEach(async () => {
        await repository.clean();
    });

    test('register eatery correctly', async () => {
        await registerEateryApplicationService.execute(command);
        const createdEatery = await repository.getById(sampleEatery.eateryId);

        expect(createdEatery).not.toBeNull();
        expect(createdEatery).toEqual(sampleEatery);
    });

    test('throw error if the same name eatery already exists in DB', async () => {
        await registerEateryApplicationService.execute(command);

        await expect(registerEateryApplicationService.execute(command)).rejects.toThrow();
    });
});
