// import EateryAddress from '../valueObject/eatery/EateryAddress';
import EateryBusinessHours from '../valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../valueObject/eatery/EateryCategory';
// import EateryCountry from '../valueObject/eatery/EateryCountry';
import EateryDescription from '../valueObject/eatery/EateryDescription';
import EateryId from '../valueObject/eatery/EateryId';
import EateryImages from '../valueObject/eatery/EateryImages';
import EateryLocation from '../valueObject/eatery/EateryLocation';
import EateryName from '../valueObject/eatery/EateryName';
// import EateryRating from '../valueObject/eatery/EateryRating';
import EateryRegularHolidays from '../valueObject/eatery/EateryRegularHolidays';
import UserId from '../valueObject/user/UserId';
import Eatery from './Eatery';

const mockEateryId = new EateryId('sdfjsdfkjgier');
const mockEateryName = new EateryName('Test Eatery');
const mockEateryCategory = new EateryCategory('Western');
const mockEateryDescription = new EateryDescription('Description');
// const mockEateryRating = new EateryRating(4.5);
// const mockEateryAddress = new EateryAddress('123 Test St');
const mockEateryLocation = new EateryLocation([56, 78]);
// const mockEateryCountry = new EateryCountry('JPN');
const mockEateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
const mockEateryRegularHolidays = new EateryRegularHolidays(['sunday']);
const mockEateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);
const mockUserId = new UserId('mockuserid');

describe('Eatery', () => {
    it('should create an Eatery instance with the correct properties', () => {
        const eatery = Eatery.create(
            mockEateryId,
            mockEateryName,
            mockEateryCategory,
            mockEateryDescription,
            // mockEateryRating,
            // mockEateryAddress,
            mockEateryLocation,
            // mockEateryCountry,
            mockEateryBusinessHours,
            mockEateryRegularHolidays,
            mockEateryImages,
            mockUserId,
        );

        expect(eatery.eateryId).toEqual(mockEateryId);
        expect(eatery.eateryName).toEqual(mockEateryName);
        expect(eatery.eateryCategory).toEqual(mockEateryCategory);
        expect(eatery.eateryDescription).toEqual(mockEateryDescription);
        // expect(eatery.eateryRating).toEqual(mockEateryRating);
        // expect(eatery.eateryAddress).toEqual(mockEateryAddress);
        expect(eatery.eateryLocation).toEqual(mockEateryLocation);
        // expect(eatery.eateryCountry).toEqual(mockEateryCountry);
        expect(eatery.eateryBusinessHours).toEqual(mockEateryBusinessHours);
        expect(eatery.eateryRegularHolidays).toEqual(mockEateryRegularHolidays);
        expect(eatery.eateryImages).toEqual(mockEateryImages);
        expect(eatery.userId).toEqual(mockUserId);
    });
});
