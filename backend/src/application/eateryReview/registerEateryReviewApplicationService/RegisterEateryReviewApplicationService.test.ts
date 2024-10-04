import InMemoryEateryReviewRepository from '../../../infrastructure/shared/InMemoryEateryReviewRepository';
import { sampleEateryReview } from '../testEateryReviewData';
import RegisterEateryReviewApplicationService, { RegisterEateryReviewCommand } from './RegisterEateryReviewApplicationService';

describe('RegisterEateryReviewApplicationService', () => {
    const repository = new InMemoryEateryReviewRepository();
    const registerEateryReviewApplicationService = new RegisterEateryReviewApplicationService(
        repository,
    );

    const command: RegisterEateryReviewCommand = {
        eateryReview: sampleEateryReview,
    };

    test('register eatery review correctly', async () => {
        expect(await registerEateryReviewApplicationService.execute(command)).toBe(undefined);
        const createdEateryReview = await repository.getById(sampleEateryReview.eateryReviewId);

        expect(createdEateryReview).not.toBeNull();
        expect(createdEateryReview).toEqual(sampleEateryReview);
    });
});
