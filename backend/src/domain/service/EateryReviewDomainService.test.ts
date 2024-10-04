import InMemoryEateryReviewRepository from '../../infrastructure/shared/InMemoryEateryReviewRepository';
import EateryReview from '../entities/EateryReview';
import EateryId from '../valueObject/eatery/EateryId';
import EateryReviewComment from '../valueObject/eateryReview/EateryReviewComment';
import EateryReviewRating from '../valueObject/eateryReview/EateryReviewRating';
import UserId from '../valueObject/user/UserId';
import EateryReviewDomainService from './EateryReviewDomainService';
import EateryReviewId from '../valueObject/eateryReview/EateryReviewId';

describe('EateryReviewDomainService', () => {
    const inMemoryEateryReviewRepository = new InMemoryEateryReviewRepository();
    const eateryReviewDomainService = new EateryReviewDomainService(inMemoryEateryReviewRepository);
    let beforeEachEateryReview: EateryReview;

    const sampleEateryReview = EateryReview.create(
        new EateryReviewId('abcdef'),
        new EateryReviewComment('sampleComment'),
        new EateryReviewRating(3),
        new EateryId('eatery-id'),
        new UserId('user-id'),
    );

    beforeEach(async () => {
        beforeEachEateryReview = EateryReview.create(
            new EateryReviewId('before'),
            new EateryReviewComment('EateryReviewComment'),
            new EateryReviewRating(3),
            new EateryId('before-eatery-id'),
            new UserId('before-user-id'),
        );
        await inMemoryEateryReviewRepository.register(beforeEachEateryReview);
    });

    test('deleteEateryReview function test', async () => {
        await eateryReviewDomainService.deleteEateryReview(beforeEachEateryReview);
        const target = await inMemoryEateryReviewRepository
            .getById(beforeEachEateryReview.eateryReviewId);
        expect(target).toBeNull();
    });

    test('registerEateryReview function  test', async () => {
        await eateryReviewDomainService.registerEateryReview(sampleEateryReview);
        const target = await inMemoryEateryReviewRepository
            .getById(sampleEateryReview.eateryReviewId);
        expect(target).toBe(sampleEateryReview);
    });

    test('updateEateryReview function test', async () => {
        const willEateryReview = await inMemoryEateryReviewRepository
            .getById(beforeEachEateryReview.eateryReviewId);
        if (willEateryReview == null) {
            throw new Error('EateryReview not found.');
        }
        const updatedEateryReview = EateryReview.reconstruct(
            willEateryReview.eateryReviewId,
            new EateryReviewComment('updatedCommnet'),
            willEateryReview.eateryReviewRating,
            willEateryReview.eateryId,
            willEateryReview.userId,
        );
        await eateryReviewDomainService.updateEateryReview(updatedEateryReview);
        const updatedEateryReviewInDB = await inMemoryEateryReviewRepository
            .getById(updatedEateryReview.eateryReviewId);
        expect(updatedEateryReview).toBe(updatedEateryReviewInDB);
    });

    test('readEatery function  test', async () => {
        const target = await inMemoryEateryReviewRepository.get();
        if (!target) {
            throw new Error('not found eatery');
        }
        expect(target[0]).toBe(beforeEachEateryReview);
    });
});
