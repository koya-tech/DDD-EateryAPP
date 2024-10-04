import InMemoryEateryReviewRepository from '../../../infrastructure/shared/InMemoryEateryReviewRepository';
import RegisterEateryReviewApplicationService from '../registerEateryReviewApplicationService/RegisterEateryReviewApplicationService';
import { sampleEateryReview } from '../testEateryReviewData';
import DeleteEateryReviewApplicationService, { DeleteEateryReviewCommand } from './DeleteEateryReviewApplicationService';

describe('DeleteEateryReviewApplicationService', () => {
    const repository = new InMemoryEateryReviewRepository();
    const registerEateryReviewApplicationService = new RegisterEateryReviewApplicationService(
        repository,
    );
    const deleteEateryReviewApplicationService = new DeleteEateryReviewApplicationService(
        repository,
    );

    const command: DeleteEateryReviewCommand = {
        eateryReview: sampleEateryReview,
    };

    test('delete eatery review correctly', async () => {
        await registerEateryReviewApplicationService.execute(command);
        await deleteEateryReviewApplicationService.execute(command);
        expect(await repository.getById(sampleEateryReview.eateryReviewId)).toBeNull();
    });

    test('throw error if the eatery review does not exist in DB', async () => {
        await expect(deleteEateryReviewApplicationService.execute(command)).rejects.toThrow();
    });
});
