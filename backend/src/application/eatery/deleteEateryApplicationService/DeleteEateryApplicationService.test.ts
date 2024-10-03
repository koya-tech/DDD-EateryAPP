import InMemoryEateryRepository from '../../../infrastructure/shared/InMemoryEateryRepository';
import DeleteEateryApplicationService, { DeleteEateryCommand } from './DeleteEateryApplicationService';
import RegisterEateryApplicationService from '../registerEateryApplicationService/RegisterEateryApplicationService';
import { sampleEatery } from '../testEateryData';

describe('DeleteEateryApplicationService', () => {
    const command: Required<DeleteEateryCommand> = {
        eatery: sampleEatery,
    };

    const repository = new InMemoryEateryRepository();
    const registerEateryApplicationService = new RegisterEateryApplicationService(repository);
    const deleteEateryApplicationService = new DeleteEateryApplicationService(repository);

    test('delete eatery correctly', async () => {
        await registerEateryApplicationService.execute(command);
        await deleteEateryApplicationService.execute(command);
        const deletedEatery = await repository.getById(sampleEatery.eateryId);

        expect(deletedEatery).toBeNull();
    });

    test('throw error if the same name eatery already exists in DB', async () => {
        await expect(deleteEateryApplicationService.execute(command)).rejects.toThrow();
    });
});
