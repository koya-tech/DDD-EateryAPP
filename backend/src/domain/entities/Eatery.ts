import EateryBusinessHours from '../valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../valueObject/eatery/EateryCategory';
import EateryDescription from '../valueObject/eatery/EateryDescription';
import EateryId from '../valueObject/eatery/EateryId';
import EateryImages from '../valueObject/eatery/EateryImages';
import EateryLocation from '../valueObject/eatery/EateryLocation';
import EateryName from '../valueObject/eatery/EateryName';
import EateryRegularHolidays from '../valueObject/eatery/EateryRegularHolidays';
import UserId from '../valueObject/user/UserId';

export default class Eatery {
    private constructor(
        private readonly _eateryId: EateryId,
        private _eateryName: EateryName,
        private _eateryCategory: EateryCategory,
        private _eateryDescription: EateryDescription,
        // private _eateryRating: EateryRating,
        // private _eateryAddress: EateryAddress,
        private _eateryLocation: EateryLocation,
        // private _eateryCountry: EateryCountry,
        private _eateryBusinessHours: EateryBusinessHours,
        private _eateryRegularHolidays: EateryRegularHolidays,
        private _eateryImages: EateryImages,
        private readonly _userId: UserId,
    ) { }

    static create(
        eateryId: EateryId,
        eateryName: EateryName,
        eateryCategory: EateryCategory,
        eateryDescription: EateryDescription,
        // eateryRating: EateryRating,
        // eateryAddress: EateryAddress,
        eateryLocation: EateryLocation,
        // eateryCountry: EateryCountry,
        eateryBusinessHours: EateryBusinessHours,
        eateryRegularHolidays: EateryRegularHolidays,
        eateryImages: EateryImages,
        userId: UserId,
    ) {
        return new Eatery(
            eateryId,
            eateryName,
            eateryCategory,
            eateryDescription,
            // eateryRating,
            // eateryAddress,
            eateryLocation,
            // eateryCountry,
            eateryBusinessHours,
            eateryRegularHolidays,
            eateryImages,
            userId,
        );
    }

    static reconstruct(
        eateryId: EateryId,
        eateryName: EateryName,
        eateryCategory: EateryCategory,
        eateryDescription: EateryDescription,
        // eateryRating: EateryRating,
        // eateryAddress: EateryAddress,
        eateryLocation: EateryLocation,
        // eateryCountry: EateryCountry,
        eateryBusinessHours: EateryBusinessHours,
        eateryRegularHolidays: EateryRegularHolidays,
        eateryImages: EateryImages,
        userId: UserId,
    ) {
        return new Eatery(
            eateryId,
            eateryName,
            eateryCategory,
            eateryDescription,
            // eateryRating,
            // eateryAddress,
            eateryLocation,
            // eateryCountry,
            eateryBusinessHours,
            eateryRegularHolidays,
            eateryImages,
            userId,
        );
    }

    get eateryId(): EateryId {
        return this._eateryId;
    }

    get eateryName(): EateryName {
        return this._eateryName;
    }

    get eateryCategory(): EateryCategory {
        return this._eateryCategory;
    }

    get eateryDescription(): EateryDescription {
        return this._eateryDescription;
    }

    // get eateryRating(): EateryRating {
    //     return this._eateryRating;
    // }

    // get eateryAddress(): EateryAddress {
    //     return this._eateryAddress;
    // }

    get eateryLocation(): EateryLocation {
        return this._eateryLocation;
    }

    // get eateryCountry(): EateryCountry {
    //     return this._eateryCountry;
    // }

    get eateryBusinessHours(): EateryBusinessHours {
        return this._eateryBusinessHours;
    }

    get eateryRegularHolidays(): EateryRegularHolidays {
        return this._eateryRegularHolidays;
    }

    get eateryImages(): EateryImages {
        return this._eateryImages;
    }

    get userId(): UserId {
        return this._userId;
    }
}
