import InMemoryEateryReviewRepository from '../../../infrastructure/shared/InMemoryEateryReviewRepository';
import EateryReviewDto from '../eateryReviewDto';
import RegisterEateryReviewApplicationService from '../registerEateryReviewApplicationService/RegisterEateryReviewApplicationService';
import { sampleEateryReview } from '../testEateryReviewData';
import GetEateryReviewApplicationService, { GetEateryReviewCommand } from './GetEateryReviewApplicationService';

describe('GetEateryReviewApplicationService', () => {
    const repository = new InMemoryEateryReviewRepository();
    const registerEateryReviewApplicationService = new RegisterEateryReviewApplicationService(
        repository,
    );
    const getEateryReviewApplicationService = new GetEateryReviewApplicationService(
        repository,
    );

    const command: GetEateryReviewCommand = {
        eateryReview: sampleEateryReview,
    };

    beforeEach(() => {
        repository.clean();
    });

    test('get eatery review correctly', async () => {
        await registerEateryReviewApplicationService.execute(command);
        const eateryReview = await getEateryReviewApplicationService.execute(command);

        expect(eateryReview).not.toBeNull();
        expect(eateryReview).toEqual(new EateryReviewDto(sampleEateryReview));
    });

    test('throw error if the eatery review does not exist in DB', async () => {
        await expect(getEateryReviewApplicationService.execute(command)).rejects.toThrow();
    });
});
