import Eatery from '../../domain/entities/Eatery';
import EateryBusinessHours from '../../domain/valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../../domain/valueObject/eatery/EateryCategory';
import EateryDescription from '../../domain/valueObject/eatery/EateryDescription';
import EateryId from '../../domain/valueObject/eatery/EateryId';
import EateryImages from '../../domain/valueObject/eatery/EateryImages';
import EateryLocation from '../../domain/valueObject/eatery/EateryLocation';
import EateryName from '../../domain/valueObject/eatery/EateryName';
import EateryRegularHolidays from '../../domain/valueObject/eatery/EateryRegularHolidays';

// However, use same ID
const eateryId = new EateryId('abcdef');

// This is a sample eatery data for testing purposes
const sampleEateryName = new EateryName('sample Eatery');
const sampleEateryCategory = new EateryCategory('Western');
const sampleEateryDescription = new EateryDescription('sample Description');
// const sampleEateryRating = new EateryRating(4.5);
// const sampleEateryAddress = new EateryAddress('123 Test St');
const sampleEateryLocation = new EateryLocation([56, 78]);
// const sampleEateryCountry = new EateryCountry('JPN');
const sampleEateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
const sampleEateryRegularHolidays = new EateryRegularHolidays(['sunday']);
const sampleEateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);

export const sampleEatery = Eatery.create(
    eateryId,
    sampleEateryName,
    sampleEateryCategory,
    sampleEateryDescription,
    sampleEateryLocation,
    sampleEateryBusinessHours,
    sampleEateryRegularHolidays,
    sampleEateryImages,
);

export const sampleEateryFromClient = {
    eateryName: sampleEateryName.value,
    eateryCategory: sampleEateryCategory.value,
    eateryDescription: sampleEateryDescription.value,
    eateryLocationLatitude: sampleEateryLocation.value[1].toString(),
    eateryLocationLongitude: sampleEateryLocation.value[0].toString(),
    eateryBusinessStartHour: sampleEateryBusinessHours.value[0],
    eateryBusinessEndHour: sampleEateryBusinessHours.value[1],
    eateryRegularHolidays: sampleEateryRegularHolidays.value,
    eateryImages: sampleEateryImages.value,
};

// This is a sample for update test data
const updatedEateryName = new EateryName('updated Eatery');
const updatedEateryCategory = new EateryCategory('Western');
const updatedEateryDescription = new EateryDescription('updated Description');
const updatedEateryLocation = new EateryLocation([56, 78]);
const updatedEateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
const updatedEateryRegularHolidays = new EateryRegularHolidays(['sunday']);
const updatedEateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);

export const updatedEatery = Eatery.create(
    eateryId,
    updatedEateryName,
    updatedEateryCategory,
    updatedEateryDescription,
    updatedEateryLocation,
    updatedEateryBusinessHours,
    updatedEateryRegularHolidays,
    updatedEateryImages,
);

// This is a sample of completely different sample data
const differentEateryId = new EateryId('ghijk');
const differentEateryName = new EateryName('different Eatery');
const differentEateryCategory = new EateryCategory('Western');
const differentEateryDescription = new EateryDescription('different Description');
const differentEateryLocation = new EateryLocation([56, 78]);
const differentEateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
const differentEateryRegularHolidays = new EateryRegularHolidays(['sunday']);
const differentEateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);

export const differentEatery = Eatery.create(
    differentEateryId,
    differentEateryName,
    differentEateryCategory,
    differentEateryDescription,
    differentEateryLocation,
    differentEateryBusinessHours,
    differentEateryRegularHolidays,
    differentEateryImages,
);
