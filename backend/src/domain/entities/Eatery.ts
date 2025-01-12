import EateryBusinessHours from '../valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../valueObject/eatery/EateryCategory';
import EateryDescription from '../valueObject/eatery/EateryDescription';
import EateryId from '../valueObject/eatery/EateryId';
import EateryImages from '../valueObject/eatery/EateryImages';
import EateryLocation from '../valueObject/eatery/EateryLocation';
import EateryName from '../valueObject/eatery/EateryName';
import EateryRegularHolidays from '../valueObject/eatery/EateryRegularHolidays';

export default class Eatery {
    private constructor(
        private readonly _eateryId: EateryId,
        private _eateryName: EateryName,
        private _eateryCategory: EateryCategory,
        private _eateryDescription: EateryDescription,
        private _eateryLocation: EateryLocation,
        private _eateryBusinessHours: EateryBusinessHours,
        private _eateryRegularHolidays: EateryRegularHolidays,
        private _eateryImages: EateryImages,
    ) { }

    static create(
        eateryId: EateryId,
        eateryName: EateryName,
        eateryCategory: EateryCategory,
        eateryDescription: EateryDescription,
        eateryLocation: EateryLocation,
        eateryBusinessHours: EateryBusinessHours,
        eateryRegularHolidays: EateryRegularHolidays,
        eateryImages: EateryImages,
    ) {
        return new Eatery(
            eateryId,
            eateryName,
            eateryCategory,
            eateryDescription,
            eateryLocation,
            eateryBusinessHours,
            eateryRegularHolidays,
            eateryImages,
        );
    }

    static reconstruct(
        eateryId: EateryId,
        eateryName: EateryName,
        eateryCategory: EateryCategory,
        eateryDescription: EateryDescription,
        eateryLocation: EateryLocation,
        eateryBusinessHours: EateryBusinessHours,
        eateryRegularHolidays: EateryRegularHolidays,
        eateryImages: EateryImages,
    ) {
        return new Eatery(
            eateryId,
            eateryName,
            eateryCategory,
            eateryDescription,
            eateryLocation,
            eateryBusinessHours,
            eateryRegularHolidays,
            eateryImages,
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

    get eateryLocation(): EateryLocation {
        return this._eateryLocation;
    }

    get eateryBusinessHours(): EateryBusinessHours {
        return this._eateryBusinessHours;
    }

    get eateryRegularHolidays(): EateryRegularHolidays {
        return this._eateryRegularHolidays;
    }

    get eateryImages(): EateryImages {
        return this._eateryImages;
    }
}
