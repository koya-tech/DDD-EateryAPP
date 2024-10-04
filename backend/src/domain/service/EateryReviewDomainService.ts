import EateryReview from '../entities/EateryReview';
import { IEateryReviewRepository } from '../repository/IEateryReviewRepository';
import EateryReviewId from '../valueObject/eateryReview/EateryReviewId';

export default class EateryReviewDomainService {
    constructor(
        private eateryReviewRepository: IEateryReviewRepository,
    ) { }

    async registerEateryReview(eateryReview: EateryReview): Promise<EateryReview> {
        await this.eateryReviewRepository.register(eateryReview);
        return eateryReview;
    }

    async deleteEateryReview(eateryReview: EateryReview): Promise<void> {
        const targetEateryReview = await this.eateryReviewRepository
            .getById(eateryReview.eateryReviewId);
        if (!targetEateryReview?.eateryId) {
            throw new Error('Reviewed Eatery not found.');
        }
        await this.eateryReviewRepository.deleteById(targetEateryReview.eateryReviewId);
    }

    async updateEateryReview(eateryReview: EateryReview): Promise<void> {
        const targetEateryReview = await this.eateryReviewRepository
            .getById(eateryReview.eateryReviewId);
        if (!targetEateryReview) {
            throw new Error('Eatery Review not found.');
        }
        await this.eateryReviewRepository.update(eateryReview);
    }

    async getEateryReview(eateryReviewId: EateryReviewId): Promise<EateryReview> {
        const targetEateryReview = await this.eateryReviewRepository
            .getById(eateryReviewId);
        if (!targetEateryReview) {
            throw new Error('Eatery Review not found.');
        }
        return targetEateryReview;
    }
}
