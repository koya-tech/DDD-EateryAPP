import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MongooseEateryRepository from './MongooseEateryRepository';
import EateryId from '../domain/valueObject/eatery/EateryId';
import Eatery from '../domain/entities/Eatery';
import EateryBusinessHours from '../domain/valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../domain/valueObject/eatery/EateryCategory';
import EateryDescription from '../domain/valueObject/eatery/EateryDescription';
import EateryImages from '../domain/valueObject/eatery/EateryImages';
import EateryLocation from '../domain/valueObject/eatery/EateryLocation';
import EateryName from '../domain/valueObject/eatery/EateryName';
import EateryRegularHolidays from '../domain/valueObject/eatery/EateryRegularHolidays';

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
    const eateryLocation = new EateryLocation([56, 78]);
    const eateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
    const eateryRegularHolidays = new EateryRegularHolidays(['sunday']);
    const eateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);

    const eatery = Eatery.create(
        eateryId,
        eateryName,
        eateryCategory,
        eateryDescription,
        eateryLocation,
        eateryBusinessHours,
        eateryRegularHolidays,
        eateryImages,
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
        expect(createdEntity?.eateryLocation.equals(new EateryLocation([78, 56]))).toBeTruthy();
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
        const updatedEateryLocation = new EateryLocation([55, 55]);
        const updatedEateryBusinessHours = new EateryBusinessHours(['05:00', '17:00']);
        const updatedEateryRegularHolidays = new EateryRegularHolidays(['saturday']);
        const updatedEateryImages = new EateryImages(['image1update.jpg', 'image2update.jpg']);
        const updatedEatery = Eatery.create(
            eateryList[0].eateryId,
            updatedEateryName,
            updatedEateryCategory,
            updatedEateryDescription,
            updatedEateryLocation,
            updatedEateryBusinessHours,
            updatedEateryRegularHolidays,
            updatedEateryImages,
        );

        await repository.update(updatedEatery);
        const createdEntity = await repository.getById(eateryList[0].eateryId);

        expect(createdEntity?.eateryName.equals(updatedEateryName)).toBeTruthy();
        expect(createdEntity?.eateryCategory.equals(updatedEateryCategory)).toBeTruthy();
        expect(createdEntity?.eateryCategory.equals(updatedEateryCategory)).toBeTruthy();
        expect(createdEntity?.eateryDescription.equals(updatedEateryDescription)).toBeTruthy();
        expect(createdEntity?.eateryLocation.equals(updatedEateryLocation)).toBeTruthy();
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
