import EateryBusinessHours from '../valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../valueObject/eatery/EateryCategory';
import EateryDescription from '../valueObject/eatery/EateryDescription';
import EateryId from '../valueObject/eatery/EateryId';
import EateryImages from '../valueObject/eatery/EateryImages';
import EateryLocation from '../valueObject/eatery/EateryLocation';
import EateryName from '../valueObject/eatery/EateryName';
import EateryRegularHolidays from '../valueObject/eatery/EateryRegularHolidays';
import Eatery from './Eatery';

const mockEateryId = new EateryId('sdfjsdfkjgier');
const mockEateryName = new EateryName('Test Eatery');
const mockEateryCategory = new EateryCategory('Western');
const mockEateryDescription = new EateryDescription('Description');
const mockEateryLocation = new EateryLocation([56, 78]);
const mockEateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
const mockEateryRegularHolidays = new EateryRegularHolidays(['sunday']);
const mockEateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);

describe('Eatery', () => {
    it('should create an Eatery instance with the correct properties', () => {
        const eatery = Eatery.create(
            mockEateryId,
            mockEateryName,
            mockEateryCategory,
            mockEateryDescription,
            mockEateryLocation,
            mockEateryBusinessHours,
            mockEateryRegularHolidays,
            mockEateryImages,
        );

        expect(eatery.eateryId).toEqual(mockEateryId);
        expect(eatery.eateryName).toEqual(mockEateryName);
        expect(eatery.eateryCategory).toEqual(mockEateryCategory);
        expect(eatery.eateryDescription).toEqual(mockEateryDescription);
        expect(eatery.eateryLocation).toEqual(mockEateryLocation);
        expect(eatery.eateryBusinessHours).toEqual(mockEateryBusinessHours);
        expect(eatery.eateryRegularHolidays).toEqual(mockEateryRegularHolidays);
        expect(eatery.eateryImages).toEqual(mockEateryImages);
    });
});
