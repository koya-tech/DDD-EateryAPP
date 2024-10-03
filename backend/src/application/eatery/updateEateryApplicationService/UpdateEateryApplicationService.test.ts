import InMemoryEateryRepository from '../../../infrastructure/shared/InMemoryEateryRepository';
import RegisterEateryApplicationService from '../registerEateryApplicationService/RegisterEateryApplicationService';
import { sampleEatery, updatedEatery } from '../testEateryData';
import UpdateEateryApplicationService, { UpdateEateryCommand } from './UpdateEateryApplicationService';

describe('UpdateEateryApplicationService', () => {
    const repository = new InMemoryEateryRepository();
    const registerEateryApplicationService = new RegisterEateryApplicationService(repository);
    const updateEateryApplicationService = new UpdateEateryApplicationService(repository);

    const commandForSample: Required<UpdateEateryCommand> = {
        eatery: sampleEatery,
    };

    const commandForUpdate: Required<UpdateEateryCommand> = {
        eatery: updatedEatery,
    };

    beforeEach(async () => {
        repository.clean();
    });

    test('can update eatery', async () => {
        await registerEateryApplicationService.execute(commandForSample);

        await updateEateryApplicationService.execute(commandForUpdate);
        const targetEatery = await repository.getById(updatedEatery.eateryId);

        expect(updatedEatery).toEqual(targetEatery);
    });

    test('throw error if eatery not found', async () => {
        await expect(updateEateryApplicationService.execute(commandForSample)).rejects.toThrow();
    });
});
