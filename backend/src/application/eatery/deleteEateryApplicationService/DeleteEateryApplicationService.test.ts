import InMemoryEateryRepository from '../../../infrastructure/shared/InMemoryEateryRepository';
import DeleteEateryApplicationService, { DeleteEateryCommand } from './DeleteEateryApplicationService';
import RegisterEateryApplicationService, { RegisterEateryCommand } from '../registerEateryApplicationService/RegisterEateryApplicationService';
import { sampleEatery, sampleEateryFromClient } from '../testEateryData';

describe('DeleteEateryApplicationService', () => {
    const registerCommand: Required<RegisterEateryCommand> = {
        eatery: sampleEateryFromClient,
    };

    const deleteCommand: Required<DeleteEateryCommand> = {
        eatery: sampleEatery,
    };

    const repository = new InMemoryEateryRepository();
    const registerEateryApplicationService = new RegisterEateryApplicationService(repository);
    const deleteEateryApplicationService = new DeleteEateryApplicationService(repository);

    test('delete eatery correctly', async () => {
        await registerEateryApplicationService.execute(registerCommand);
        await deleteEateryApplicationService.execute(deleteCommand);
        const deletedEatery = await repository.getById(sampleEatery.eateryId);

        expect(deletedEatery).toBeNull();
    });

    test('throw error if the same name eatery already exists in DB', async () => {
        await expect(deleteEateryApplicationService.execute(deleteCommand)).rejects.toThrow();
    });
});
