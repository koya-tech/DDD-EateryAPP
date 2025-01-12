import InMemoryEateryRepository from '../../infrastructure/shared/InMemoryEateryRepository';
import Eatery from '../entities/Eatery';
import EateryBusinessHours from '../valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../valueObject/eatery/EateryCategory';
import EateryDescription from '../valueObject/eatery/EateryDescription';
import EateryImages from '../valueObject/eatery/EateryImages';
import EateryLocation from '../valueObject/eatery/EateryLocation';
import EateryName from '../valueObject/eatery/EateryName';
import EateryRegularHolidays from '../valueObject/eatery/EateryRegularHolidays';
import EateryDomainService from './EateryDomainService';
import EateryId from '../valueObject/eatery/EateryId';

describe('EateryDomainService', () => {
    const repository = new InMemoryEateryRepository();
    const eateryDomainService = new EateryDomainService(repository);

    const sampleEateryId = new EateryId('abcdef');
    const sampleEateryName = new EateryName('subTest Eatery');
    const sampleEateryCategory = new EateryCategory('Western');
    const sampleEateryDescription = new EateryDescription('Description');
    const sampleEateryLocation = new EateryLocation([56, 78]);
    const sampleEateryBusinessHours = new EateryBusinessHours(['08:00', '17:00']);
    const sampleEateryRegularHolidays = new EateryRegularHolidays(['sunday']);
    const sampleEateryImages = new EateryImages(['image1.jpg', 'image2.jpg']);
    const sampleEatery = Eatery.create(
        sampleEateryId,
        sampleEateryName,
        sampleEateryCategory,
        sampleEateryDescription,
        sampleEateryLocation,
        sampleEateryBusinessHours,
        sampleEateryRegularHolidays,
        sampleEateryImages,
    );

    beforeEach(async () => {
        repository.clean();
    });

    test('deleteEatery function test', async () => {
        await repository.register(sampleEatery);
        await eateryDomainService.deleteEatery(sampleEatery.eateryId);
        const target = await repository.getById(sampleEatery.eateryId);
        expect(target).toBeNull();
    });

    test('registerEatery function  test', async () => {
        await eateryDomainService.registerEatery(sampleEatery);
        const target = await repository.getById(sampleEatery.eateryId);
        expect(target).toStrictEqual(sampleEatery);
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
            willUpdateEatery.eateryLocation,
            willUpdateEatery.eateryBusinessHours,
            willUpdateEatery.eateryRegularHolidays,
            willUpdateEatery.eateryImages,
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
        expect(target[0]).toStrictEqual(sampleEatery);
    });
});
