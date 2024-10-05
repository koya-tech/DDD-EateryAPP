import InMemoryEateryRepository from '../../infrastructure/shared/InMemoryEateryRepository';
import Eatery from '../entities/Eatery';
import EateryAddress from '../valueObject/eatery/EateryAddress';
import EateryBusinessHours from '../valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../valueObject/eatery/EateryCategory';
import EateryCountry from '../valueObject/eatery/EateryCountry';
import EateryDescription from '../valueObject/eatery/EateryDescription';
import EateryImages from '../valueObject/eatery/EateryImages';
import EateryLocation from '../valueObject/eatery/EateryLocation';
import EateryName from '../valueObject/eatery/EateryName';
import EateryRating from '../valueObject/eatery/EateryRating';
import EateryRegularHolidays from '../valueObject/eatery/EateryRegularHolidays';
import EateryDomainService from './EateryDomainService';
import EateryId from '../valueObject/eatery/EateryId';
import UserId from '../valueObject/user/UserId';

describe('EateryDomainService', () => {
    const repository = new InMemoryEateryRepository();
    const eateryDomainService = new EateryDomainService(repository);

    const sampleEateryId = new EateryId('abcdef');
    const sampleEateryName = new EateryName('subTest Eatery');
    const sampleEateryCategory = new EateryCategory('Western');
    const sampleEateryDescription = new EateryDescription('Description');
    const sampleEateryRating = new EateryRating(4.5);
    const sampleEateryAddress = new EateryAddress('123 Test St');
    const sampleEateryLocation = new EateryLocation([56, 78]);
    const sampleEateryCountry = new EateryCountry('JPN');
    const sampleEateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
    const sampleEateryRegularHolidays = new EateryRegularHolidays(['sunday']);
    const sampleEateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);
    const sampleUserId = new UserId('mockUserId');
    const sampleEatery = Eatery.create(
        sampleEateryId,
        sampleEateryName,
        sampleEateryCategory,
        sampleEateryDescription,
        sampleEateryRating,
        sampleEateryAddress,
        sampleEateryLocation,
        sampleEateryCountry,
        sampleEateryBusinessHours,
        sampleEateryRegularHolidays,
        sampleEateryImages,
        sampleUserId,
    );

    beforeEach(async () => {
        repository.clean();
    });

    test('return true when same eateryName TEST exist in DB', async () => {
        await repository.register(sampleEatery);
        const result = await eateryDomainService.IsEateryNameDuplicate(sampleEatery);
        expect(result).toBeTruthy();
    });

    test('return true when same eateryName TEST does not exist in DB', async () => {
        const result = await eateryDomainService.IsEateryNameDuplicate(sampleEatery);
        expect(result).toBeFalsy();
    });

    test('deleteEatery function test', async () => {
        await repository.register(sampleEatery);
        await eateryDomainService.deleteEatery(sampleEatery);
        const target = await repository.getById(sampleEatery.eateryId);
        expect(target).toBeNull();
    });

    test('registerEatery function  test', async () => {
        await eateryDomainService.registerEatery(sampleEatery);
        const target = await repository.getById(sampleEatery.eateryId);
        expect(target).toBe(sampleEatery);
    });

    test('updateEatery function test', async () => {
        await eateryDomainService.registerEatery(sampleEatery);
        const willUpdateEatery = await repository.getById(sampleEatery.eateryId);
        if (willUpdateEatery == null) {
            throw new Error('Eatery not found.');
        }
        const updatedEatery = Eatery.reconstruct(
            sampleEatery.eateryId,
            new EateryName('updatedEatery'),
            willUpdateEatery.eateryCategory,
            willUpdateEatery.eateryDescription,
            willUpdateEatery.eateryRating,
            willUpdateEatery.eateryAddress,
            willUpdateEatery.eateryLocation,
            willUpdateEatery.eateryCountry,
            willUpdateEatery.eateryBusinessHours,
            willUpdateEatery.eateryRegularHolidays,
            willUpdateEatery.eateryImages,
            willUpdateEatery.userId,
        );
        await eateryDomainService.updateEatery(updatedEatery);
        const updatedEateryInDB = await repository.getById(updatedEatery.eateryId);
        expect(updatedEateryInDB).toBe(updatedEatery);
    });

    test('getEatery function  test', async () => {
        await eateryDomainService.registerEatery(sampleEatery);
        const target = await repository.get();
        if (!target) {
            throw new Error('not found eatery');
        }
        expect(target[0]).toBe(sampleEatery);
    });
});
