import Eatery from '../../domain/entities/Eatery';

export default class EateryDto {
    public readonly eateryId: string;

    public readonly eateryName: string;

    public readonly eateryCategory: string;

    public readonly eateryDescription: string;

    public readonly eateryRating: number;

    public readonly eateryAddress: string;

    public readonly eateryLocation: number[];

    public readonly eateryCountry: string;

    public readonly eateryBusinessHours: string[];

    public readonly eateryRegularHolidays: string[];

    public readonly eateryImages: string[];

    public readonly userId: string;

    constructor(eatery: Eatery) {
        this.eateryId = eatery.eateryId.value;
        this.eateryName = eatery.eateryName.value;
        this.eateryCategory = eatery.eateryCategory.value;
        this.eateryDescription = eatery.eateryDescription.value;
        this.eateryRating = eatery.eateryRating.value;
        this.eateryAddress = eatery.eateryAddress.value;
        this.eateryLocation = eatery.eateryLocation.value;
        this.eateryCountry = eatery.eateryCountry.value;
        this.eateryBusinessHours = eatery.eateryBusinessHours.value;
        this.eateryRegularHolidays = eatery.eateryRegularHolidays.value;
        this.eateryImages = eatery.eateryImages.value;
        this.userId = eatery.userId.value;
    }
}
