import InMemoryEateryRepository from '../../../infrastructure/shared/InMemoryEateryRepository';
import RegisterEateryApplicationService, { RegisterEateryCommand } from '../registerEateryApplicationService/RegisterEateryApplicationService';
import { sampleEateryFromClient, updatedEatery } from '../testEateryData';
import UpdateEateryApplicationService, { UpdateEateryCommand } from './UpdateEateryApplicationService';

describe('UpdateEateryApplicationService', () => {
    const repository = new InMemoryEateryRepository();
    const registerEateryApplicationService = new RegisterEateryApplicationService(repository);
    const updateEateryApplicationService = new UpdateEateryApplicationService(repository);

    const registerCommandForSample: Required<RegisterEateryCommand> = {
        eatery: sampleEateryFromClient,
    };

    const updateCommandForUpdate: Required<UpdateEateryCommand> = {
        eatery: updatedEatery,
    };

    beforeEach(async () => {
        repository.clean();
    });

    test('can update eatery', async () => {
        await registerEateryApplicationService.execute(registerCommandForSample);

        await updateEateryApplicationService.execute(updateCommandForUpdate);
        const targetEatery = await repository.getById(updatedEatery.eateryId);

        expect(updatedEatery).toEqual(targetEatery);
    });

    test('throw error if eatery not found', async () => {
        await expect(updateEateryApplicationService.execute(updateCommandForUpdate))
            .rejects.toThrow();
    });
});
