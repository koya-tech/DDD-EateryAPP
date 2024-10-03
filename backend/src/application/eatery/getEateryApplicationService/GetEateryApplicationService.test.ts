import InMemoryEateryRepository from '../../../infrastructure/shared/InMemoryEateryRepository';
import EateryDto from '../eateryDto';
import { sampleEatery } from '../testEateryData';
import GetEateryApplicationService, { GetEateryCommand } from './GetEateryApplicationService';

describe('GetEateryApplicationService', () => {
    const repository = new InMemoryEateryRepository();
    const getEateryApplicationService = new GetEateryApplicationService(repository);

    const command: Required<GetEateryCommand> = {
        eatery: sampleEatery,
    };

    beforeEach(async () => {
        await repository.clean();
    });

    test('get eatery correctly', async () => {
        await repository.register(sampleEatery);
        const eatery = await getEateryApplicationService.execute(command);
        const sampleEateryDto = new EateryDto(sampleEatery);

        expect(eatery).toEqual(sampleEateryDto);
    });

    test('throw error if eatery not found', async () => {
        await expect(getEateryApplicationService.execute(command)).rejects.toThrow();
    });
});
