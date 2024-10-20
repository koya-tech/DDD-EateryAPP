import ValueObject from '../AbstractValueObject';

export default class EateryLocation extends ValueObject<[number, number], 'EateryLocation'> {
    static readonly LATITUDE_MAX = 90;

    static readonly LATITUDE_MIN = -90;

    static readonly LONGITUDE_MAX = 180;

    static readonly LONGITUDE_MIN = -180;

    constructor(value: [number, number]) {
        super(value);
        this.validate(value);
    }

    // eslint-disable-next-line class-methods-use-this
    protected validate(value: [number, number]): void {
        const [latitude, longitude] = value;

        if (longitude < EateryLocation.LONGITUDE_MIN || longitude > EateryLocation.LONGITUDE_MAX) {
            throw new Error('The LONGITUDE is not correct.');
        }

        if (latitude < EateryLocation.LATITUDE_MIN || latitude > EateryLocation.LATITUDE_MAX) {
            throw new Error('The LATITUDE is not correct.');
        }
    }
}
