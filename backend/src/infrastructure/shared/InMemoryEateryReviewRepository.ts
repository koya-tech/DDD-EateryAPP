import EateryReview from '../../domain/entities/EateryReview';
import { IEateryReviewRepository } from '../../domain/repository/IEateryReviewRepository';
import EateryReviewId from '../../domain/valueObject/eateryReview/EateryReviewId';

export default class InMemoryEateryReviewRepository implements IEateryReviewRepository {
    public DB: {
        [id: string]: EateryReview;
    } = {};

    async register(eateryReview: EateryReview) {
        this.DB[eateryReview.eateryReviewId.value.toString()] = eateryReview;
    }

    async update(eateryReview: EateryReview) {
        this.DB[eateryReview.eateryReviewId.value.toString()] = eateryReview;
    }

    async deleteById(eateryReviewId: EateryReviewId) {
        delete this.DB[eateryReviewId.value.toString()];
    }

    async getById(eateryReviewId: EateryReviewId): Promise<EateryReview | null> {
        const targetEateryReview = Object.entries(this.DB)
            .find(([id]) => eateryReviewId.value.toString() === this
                .DB[id].eateryReviewId.value.toString());

        return targetEateryReview ? targetEateryReview[1] : null;
    }

    async get(): Promise<EateryReview[] | null> {
        return Object.entries(this.DB).map((pair) => pair[1]);
    }

    async clean() {
        this.DB = {};
    }
}
