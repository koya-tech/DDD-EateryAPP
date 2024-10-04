import EateryReview from '../domain/entities/EateryReview';
import { IEateryReviewRepository } from '../domain/repository/IEateryReviewRepository';
import EateryId from '../domain/valueObject/eatery/EateryId';
import EateryReviewComment from '../domain/valueObject/eateryReview/EateryReviewComment';
import EateryReviewId from '../domain/valueObject/eateryReview/EateryReviewId';
import EateryReviewRating from '../domain/valueObject/eateryReview/EateryReviewRating';
import UserId from '../domain/valueObject/user/UserId';
import EateryReviewModel from '../external/mongoose/model/EateryReviewModel';

export default class MongooseEateryReviewRepository implements IEateryReviewRepository {
    // eslint-disable-next-line class-methods-use-this
    async register(eateryReview: EateryReview): Promise<void> {
        const savedEateryReview = new EateryReviewModel({
            _eateryReviewId: eateryReview.eateryId.value,
            _eateryReviewComment: eateryReview.eateryReviewComment.value,
            _eateryReviewRating: eateryReview.eateryReviewRating.value,
            _eateryId: eateryReview.eateryId.value,
            _userId: eateryReview.userId.value,
        });
        await savedEateryReview.save();
    }

    // eslint-disable-next-line class-methods-use-this
    async update(eateryReview: EateryReview): Promise<void> {
        const updatedEateryReview = await EateryReviewModel.findByIdAndUpdate(
            eateryReview.eateryReviewId.value,
            {
                _eateryReviewComment: eateryReview.eateryReviewComment.value,
                _eateryReviewRating: eateryReview.eateryReviewRating.value,
                _eateryId: eateryReview.eateryId.value,
                _userId: eateryReview.userId.value,
            },
            { new: true },
        ).exec();

        if (!updatedEateryReview) {
            throw new Error('EateryReview not found or update failed');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async deleteById(eateryReviewId: EateryReviewId): Promise<void> {
        const result = await EateryReviewModel.findByIdAndDelete(eateryReviewId.value).exec();

        if (!result) {
            throw new Error('EateryReview not found or delete failed');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getById(eateryReviewId: EateryReviewId): Promise<EateryReview | null> {
        const foundEateryReview = await EateryReviewModel.findById(eateryReviewId.value).exec();
        if (!foundEateryReview) {
            throw new Error('EateryReview not found');
        }

        return EateryReview.reconstruct(
            new EateryReviewId(foundEateryReview._id),
            new EateryReviewComment(foundEateryReview._eateryReviewComment),
            new EateryReviewRating(foundEateryReview._eateryReviewRating),
            new EateryId(foundEateryReview._eateryId),
            new UserId(foundEateryReview._userId),
        );
    }

    // eslint-disable-next-line class-methods-use-this
    async get(): Promise<EateryReview[] | null> {
        const foundEateryReviews = await EateryReviewModel.find().exec();
        if (!foundEateryReviews || foundEateryReviews.length === 0) {
            return null;
        }

        return foundEateryReviews.map((eateryReview) => EateryReview.reconstruct(
            new EateryReviewId(eateryReview._id),
            new EateryReviewComment(eateryReview._eateryReviewComment),
            new EateryReviewRating(eateryReview._eateryReviewRating),
            new EateryId(eateryReview._eateryId),
            new UserId(eateryReview._userId),
        ));
    }
}
