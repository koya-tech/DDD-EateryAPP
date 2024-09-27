import EateryReview from '../entities/EateryReview';
import { IEateryReviewRepository } from '../repository/IEateryReviewRepository';

export default class EateryReviewDomainService {
    constructor(
        private eateryReviewRepository: IEateryReviewRepository,
    ) { }

    async registerEatery(eateryReview: EateryReview): Promise<EateryReview> {
        await this.eateryReviewRepository.save(eateryReview);
        return eateryReview;
    }

    async deleteEatery(eateryReview: EateryReview): Promise<void> {
        const targetEateryReview = await this.eateryReviewRepository
            .findById(eateryReview.eateryReviewId);
        if (!targetEateryReview?.eateryId) {
            throw new Error('Reviewd Eatery not found.');
        }
        await this.eateryReviewRepository.deleteById(targetEateryReview.eateryReviewId);
    }

    async updateEatery(eateryReview: EateryReview): Promise<void> {
        const targetEateryReview = await this.eateryReviewRepository
            .findById(eateryReview.eateryReviewId);
        if (!targetEateryReview) {
            throw new Error('Eatery Review not found.');
        }
        await this.eateryReviewRepository.update(eateryReview);
    }
}
