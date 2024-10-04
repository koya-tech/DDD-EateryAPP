import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MongooseEateryReviewRepository from './MongooseEateryReviewRepository';
import EateryId from '../domain/valueObject/eatery/EateryId';
import EateryReviewComment from '../domain/valueObject/eateryReview/EateryReviewComment';
import EateryReviewId from '../domain/valueObject/eateryReview/EateryReviewId';
import EateryReviewRating from '../domain/valueObject/eateryReview/EateryReviewRating';
import UserId from '../domain/valueObject/user/UserId';
import EateryReview from '../domain/entities/EateryReview';

dotenv.config({ path: '.env.local' });

beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://${process.env.mongoDBUserName}:${process.env.mongoDBUserPassword}@dineappdb.bihid.mongodb.net/?retryWrites=true&w=majority&appName=DineAppDB`);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('MongooseEateryRepository', () => {
    beforeEach(async () => {
        await mongoose.connection.db.collection('eateryreviews').deleteMany({});
    });

    const eateryReviewId = new EateryReviewId('abcdef');
    const eateryReviewComment = new EateryReviewComment('Great place!');
    const eateryReviewRating = new EateryReviewRating(5);
    const eateryId = new EateryId('eatery-id');
    const userId = new UserId('user-id');
    const eateryReview = EateryReview.create(
        eateryReviewId,
        eateryReviewComment,
        eateryReviewRating,
        eateryId,
        userId,
    );

    const repository = new MongooseEateryReviewRepository();

    test('can get info which repo did save', async () => {
        await repository.register(eateryReview);

        const eateryReviewList = await repository.get();
        if (eateryReviewList === null) {
            throw new Error('failed to read EateryReviewInfo');
        }
        const createdEntity = await repository.getById(eateryReviewList[0].eateryReviewId);
        expect(createdEntity?.eateryReviewComment.equals(eateryReviewComment)).toBeTruthy();
        expect(createdEntity?.eateryReviewRating.equals(eateryReviewRating)).toBeTruthy();
        expect(createdEntity?.eateryId.equals(eateryId)).toBeTruthy();
        expect(createdEntity?.userId.equals(userId)).toBeTruthy();
    });

    test('can update about eateryReview info', async () => {
        await repository.register(eateryReview);

        const eateryReviewList = await repository.get();
        if (eateryReviewList === null) {
            throw new Error('failed to read EateryReviewInfo');
        }

        const updatedEateryReviewComment = new EateryReviewComment('Great place!');
        const updatedEateryReviewRating = new EateryReviewRating(5);
        const updatedEateryReview = EateryReview.create(
            eateryReviewList[0].eateryReviewId,
            updatedEateryReviewComment,
            updatedEateryReviewRating,
            eateryId,
            userId,
        );

        await repository.update(updatedEateryReview);

        const createdEntity = await repository.getById(eateryReviewList[0].eateryReviewId);

        expect(createdEntity?.eateryReviewComment.equals(updatedEateryReviewComment)).toBeTruthy();
        expect(createdEntity?.eateryReviewRating.equals(updatedEateryReviewRating)).toBeTruthy();
        expect(createdEntity?.eateryId.equals(eateryId)).toBeTruthy();
        expect(createdEntity?.userId.equals(userId)).toBeTruthy();
    });

    test('can delete eateryReview info', async () => {
        await repository.register(eateryReview);

        const eateryReviewList = await repository.get();
        if (eateryReviewList === null) {
            throw new Error('failed to read EateryReviewInfo');
        }
        await repository.deleteById(eateryReviewList[0].eateryReviewId);
        const eateryReviewListAfterDelete = await repository.get();
        expect(eateryReviewListAfterDelete).toBeNull();
    });
});
