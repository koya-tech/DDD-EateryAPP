import EateryReview from '../entities/EateryReview';
import EateryReviewId from '../valueObject/eateryReview/EateryReviewId';

export interface IEateryReviewRepository {

    register(eatery: EateryReview): Promise<void>;

    update(eatery: EateryReview): Promise<void>;

    deleteById(eateryId: EateryReviewId): Promise<void>;

    getById(eateryId: EateryReviewId): Promise<EateryReview | null>;

    get(): Promise<EateryReview[] | null>;
}
