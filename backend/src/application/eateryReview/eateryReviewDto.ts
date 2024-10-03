import EateryReview from '../../domain/entities/EateryReview';

export default class EateryReviewDTO {
    public readonly eateryReviewId: string;

    public readonly eateryId: string;

    public readonly userId: string;

    public readonly eateryReviewRating: number;

    public readonly eateryReviewComment: string;

    constructor(eateryReview: EateryReview) {
        this.eateryReviewId = eateryReview.eateryReviewId.value;
        this.eateryId = eateryReview.eateryId.value;
        this.userId = eateryReview.userId.value;
        this.eateryReviewRating = eateryReview.eateryReviewRating.value;
        this.eateryReviewComment = eateryReview.eateryReviewComment.value;
    }
}
