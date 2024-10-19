import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MongooseEateryRepository from './MongooseEateryRepository';
import EateryId from '../domain/valueObject/eatery/EateryId';
import Eatery from '../domain/entities/Eatery';
// import EateryAddress from '../domain/valueObject/eatery/EateryAddress';
import EateryBusinessHours from '../domain/valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../domain/valueObject/eatery/EateryCategory';
// import EateryCountry from '../domain/valueObject/eatery/EateryCountry';
import EateryDescription from '../domain/valueObject/eatery/EateryDescription';
import EateryImages from '../domain/valueObject/eatery/EateryImages';
import EateryLocation from '../domain/valueObject/eatery/EateryLocation';
import EateryName from '../domain/valueObject/eatery/EateryName';
// import EateryRating from '../domain/valueObject/eatery/EateryRating';
import EateryRegularHolidays from '../domain/valueObject/eatery/EateryRegularHolidays';
import UserId from '../domain/valueObject/user/UserId';

dotenv.config({ path: '.env.local' });

beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://${process.env.mongoDBUserName}:${process.env.mongoDBUserPassword}@dineappdb.bihid.mongodb.net/?retryWrites=true&w=majority&appName=DineAppDB`);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('MongooseEateryRepository', () => {
    beforeEach(async () => {
        await mongoose.connection.db.collection('eateries').deleteMany({});
    });

    const eateryId = new EateryId('abcdef');
    const eateryName = new EateryName('subTest Eatery');
    const eateryCategory = new EateryCategory('Western');
    const eateryDescription = new EateryDescription('Description');
    // const eateryRating = new EateryRating(4.5);
    // const eateryAddress = new EateryAddress('123 Test St');
    const eateryLocation = new EateryLocation([56, 78]);
    // const eateryCountry = new EateryCountry('JPN');
    const eateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
    const eateryRegularHolidays = new EateryRegularHolidays(['sunday']);
    const eateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);
    const userId = new UserId('userId');

    const eatery = Eatery.create(
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

    const repository = new MongooseEateryRepository();

    test('can get info which repo did save', async () => {
        await repository.register(eatery);

        const eateryList = await repository.get();
        if (eateryList === null) {
            throw new Error('failed to read EateryInfo');
        }
        const createdEntity = await repository.getById(eateryList[0].eateryId);

        expect(createdEntity?.eateryName.equals(eateryName)).toBeTruthy();
        expect(createdEntity?.eateryCategory.equals(eateryCategory)).toBeTruthy();
        expect(createdEntity?.eateryCategory.equals(eateryCategory)).toBeTruthy();
        expect(createdEntity?.eateryDescription.equals(eateryDescription)).toBeTruthy();
        // expect(createdEntity?.eateryRating.equals(eateryRating)).toBeTruthy();
        // expect(createdEntity?.eateryAddress.equals(eateryAddress)).toBeTruthy();
        expect(createdEntity?.eateryLocation.equals(eateryLocation)).toBeTruthy();
        // expect(createdEntity?.eateryCountry.equals(eateryCountry)).toBeTruthy();
        expect(createdEntity?.userId.equals(userId)).toBeTruthy();
    });

    test('can update about eatery info', async () => {
        await repository.register(eatery);

        const eateryList = await repository.get();
        if (eateryList === null) {
            throw new Error('failed to read EateryInfo');
        }

        const updatedEateryName = new EateryName('subTest Eatery update');
        const updatedEateryCategory = new EateryCategory('Chinese');
        const updatedEateryDescription = new EateryDescription('Description update');
        // const updatedEateryRating = new EateryRating(2.5);
        // const updatedEateryAddress = new EateryAddress('123 Test St update');
        const updatedEateryLocation = new EateryLocation([55, 55]);
        // const updatedEateryCountry = new EateryCountry('USA');
        const updatedEateryBusinessHours = new EateryBusinessHours(['05:00', '17:00']);
        const updatedEateryRegularHolidays = new EateryRegularHolidays(['saturday']);
        const updatedEateryImages = new EateryImages(['image1update.jpg', 'image2update.jpg']);
        const updatedUserId = new UserId('updated userId');
        const updatedEatery = Eatery.create(
            eateryList[0].eateryId,
            updatedEateryName,
            updatedEateryCategory,
            updatedEateryDescription,
            // updatedEateryRating,
            // updatedEateryAddress,
            updatedEateryLocation,
            // updatedEateryCountry,
            updatedEateryBusinessHours,
            updatedEateryRegularHolidays,
            updatedEateryImages,
            updatedUserId,
        );

        await repository.update(updatedEatery);
        const createdEntity = await repository.getById(eateryList[0].eateryId);

        expect(createdEntity?.eateryName.equals(updatedEateryName)).toBeTruthy();
        expect(createdEntity?.eateryCategory.equals(updatedEateryCategory)).toBeTruthy();
        expect(createdEntity?.eateryCategory.equals(updatedEateryCategory)).toBeTruthy();
        expect(createdEntity?.eateryDescription.equals(updatedEateryDescription)).toBeTruthy();
        // expect(createdEntity?.eateryRating.equals(updatedEateryRating)).toBeTruthy();
        // expect(createdEntity?.eateryAddress.equals(updatedEateryAddress)).toBeTruthy();
        expect(createdEntity?.eateryLocation.equals(updatedEateryLocation)).toBeTruthy();
        // expect(createdEntity?.eateryCountry.equals(updatedEateryCountry)).toBeTruthy();
        expect(createdEntity?.userId.equals(updatedUserId)).toBeTruthy();
    });

    test('can delete eatery info', async () => {
        await repository.register(eatery);

        const eateryList = await repository.get();
        if (eateryList === null) {
            throw new Error('failed to read UserInfo');
        }
        await repository.deleteById(eateryList[0].eateryId);
        const eateryListAfterDelete = await repository.get();
        expect(eateryListAfterDelete).toBeNull();
    });
});
