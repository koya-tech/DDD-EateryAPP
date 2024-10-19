import EateryReview from '../../../domain/entities/EateryReview';
import { IEateryReviewRepository } from '../../../domain/repository/IEateryReviewRepository';
import EateryReviewDomainService from '../../../domain/service/EateryReviewDomainService';
import EateryReviewDto from '../eateryReviewDto';

export type GetEateryReviewCommand = {
    eateryReview: EateryReview;
};

export default class GetEateryReviewApplicationService {
    constructor(
        private eateryReviewRepository: IEateryReviewRepository,
    ) { }

    async execute(command: GetEateryReviewCommand): Promise<EateryReviewDto> {
        const eateryReviewDomainService = await new EateryReviewDomainService(
            this.eateryReviewRepository,
        );

        const targetEatery = await eateryReviewDomainService.getEateryReview(
            command.eateryReview.eateryReviewId,
        );

        return new EateryReviewDto(targetEatery);
    }
}
