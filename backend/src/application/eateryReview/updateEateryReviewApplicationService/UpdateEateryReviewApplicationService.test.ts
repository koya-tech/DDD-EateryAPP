import InMemoryEateryReviewRepository from '../../../infrastructure/shared/InMemoryEateryReviewRepository';
import RegisterEateryReviewApplicationService, { RegisterEateryReviewCommand } from '../registerEateryReviewApplicationService/RegisterEateryReviewApplicationService';
import { differentEateryReview, sampleEateryReview, updateEateryReview } from '../testEateryReviewData';
import UpdateEateryReviewApplicationService, { UpdateEateryReviewCommand } from './UpdateEateryReviewApplicationService';

describe('UpdateEateryReviewApplicationService', () => {
    const repository = new InMemoryEateryReviewRepository();
    const registerEateryReviewApplicationService = new RegisterEateryReviewApplicationService(
        repository,
    );
    const updateEateryReviewApplicationService = new UpdateEateryReviewApplicationService(
        repository,
    );
    const commandForSample: Required<RegisterEateryReviewCommand> = {
        eateryReview: sampleEateryReview,
    };

    const commandForUpdate: Required<UpdateEateryReviewCommand> = {
        eateryReview: updateEateryReview,
    };

    const differentCommand: Required<UpdateEateryReviewCommand> = {
        eateryReview: differentEateryReview,
    };

    test('update eatery review correctly', async () => {
        await registerEateryReviewApplicationService.execute(commandForSample);
        await updateEateryReviewApplicationService.execute(commandForUpdate);
        const updatedEateryReview = await repository.getById(sampleEateryReview.eateryReviewId);

        expect(updatedEateryReview).not.toBeNull();
        expect(updatedEateryReview).toEqual(updateEateryReview);
    });

    test('throw error if the eatery review does not exist in DB', async () => {
        await registerEateryReviewApplicationService.execute(commandForSample);
        await expect(updateEateryReviewApplicationService.execute(differentCommand))
            .rejects.toThrow();
    });
});
