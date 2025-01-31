import Eatery from '../domain/entities/Eatery';
import { IEateryRepository } from '../domain/repository/IEateryRepository';
import EateryBusinessHours from '../domain/valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../domain/valueObject/eatery/EateryCategory';
import EateryDescription from '../domain/valueObject/eatery/EateryDescription';
import EateryId from '../domain/valueObject/eatery/EateryId';
import EateryImages from '../domain/valueObject/eatery/EateryImages';
import EateryLocation from '../domain/valueObject/eatery/EateryLocation';
import EateryName from '../domain/valueObject/eatery/EateryName';
import EateryRegularHolidays from '../domain/valueObject/eatery/EateryRegularHolidays';
import EateryModel from '../external/mongoose/model/EateryModel';
import MongodbSetting from './MongodbSetting';

export default class MongooseEateryRepository implements IEateryRepository {
    // eslint-disable-next-line class-methods-use-this
    async register(eatery: Eatery): Promise<void> {
        const savedEatery = new EateryModel({
            _eateryName: eatery.eateryName.value,
            _eateryCategory: eatery.eateryCategory.value,
            _eateryDescription: eatery.eateryDescription.value,
            _eateryLocation: {
                type: MongodbSetting.geoJsonType,
                coordinates: [
                    eatery.eateryLocation.value[0],
                    eatery.eateryLocation.value[1],
                ],
            },
            _eateryBusinessHours: eatery.eateryBusinessHours.value,
            _eateryRegularHolidays: eatery.eateryRegularHolidays.value,
            _eateryImages: eatery.eateryImages.value,
        });
        await savedEatery.save();
    }

    // eslint-disable-next-line class-methods-use-this
    async update(eatery: Eatery): Promise<void> {
        const updatedEatery = await EateryModel.findByIdAndUpdate(
            eatery.eateryId.value,
            {
                _eateryName: eatery.eateryName.value,
                _eateryCategory: eatery.eateryCategory.value,
                _eateryDescription: eatery.eateryDescription.value,
                _eateryLocation: {
                    type: MongodbSetting.geoJsonType,
                    coordinates: [
                        eatery.eateryLocation.value[0],
                        eatery.eateryLocation.value[1],
                    ],
                },
                _eateryBusinessHours: eatery.eateryBusinessHours.value,
                _eateryRegularHolidays: eatery.eateryRegularHolidays.value,
                _eateryImages: eatery.eateryImages.value,
            },
            { new: true },
        ).exec();

        if (!updatedEatery) {
            throw new Error('Eatery not found or update failed');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async deleteById(eateryId: EateryId): Promise<void> {
        console.log('eateryId@MongooseEateryRepository', eateryId);
        const result = await EateryModel.findByIdAndDelete(eateryId.value).exec();

        if (!result) {
            throw new Error('Eatery not found or delete failed');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getById(eateryId: EateryId): Promise<Eatery | null> {
        console.log('eateryId@MongooseEateryRepository', eateryId);
        const foundEatery = await EateryModel.findById(eateryId.value).exec();
        console.log('foundEatery@MongooseEateryRepository', foundEatery);
        if (!foundEatery) {
            throw new Error('Eatery not found');
        }
        const foundLocationArray = foundEatery._eateryLocation as unknown as {
            type: string,
            coordinates: [number, number],
        };
        console.log('foundLocationArray@MongooseEateryRepository', foundLocationArray);
        const foundEateryBusinessHours = foundEatery._eateryBusinessHours;

        return Eatery.reconstruct(
            new EateryId(foundEatery._id),
            new EateryName(foundEatery._eateryName),
            new EateryCategory(foundEatery._eateryCategory),
            new EateryDescription(foundEatery._eateryDescription),
            new EateryLocation(
                [
                    foundLocationArray.coordinates[0],
                    foundLocationArray.coordinates[1],
                ],
            ),
            new EateryBusinessHours(
                [
                    foundEateryBusinessHours[0],
                    foundEateryBusinessHours[1],
                ],
            ),
            new EateryRegularHolidays(foundEatery._eateryRegularHolidays),
            new EateryImages(foundEatery._eateryImages),
        );
    }

    // eslint-disable-next-line class-methods-use-this
    async get(): Promise<Eatery[] | null> {
        const foundEateries = await EateryModel.find().exec();
        console.log('foundEateries@MongooseEateryRepository', foundEateries);
        if (!foundEateries || foundEateries.length === 0) {
            return null;
        }

        return foundEateries.map((foundEatery) => {
            const foundLocationArray = foundEatery._eateryLocation as unknown as {
                type: string,
                coordinates: [number, number],
            };

            const foundEateryBusinessHours = foundEatery._eateryBusinessHours;

            return Eatery.reconstruct(
                new EateryId(foundEatery._id),
                new EateryName(foundEatery._eateryName),
                new EateryCategory(foundEatery._eateryCategory),
                new EateryDescription(foundEatery._eateryDescription),
                new EateryLocation(
                    [
                        foundLocationArray.coordinates[0],
                        foundLocationArray.coordinates[1],
                    ],
                ),
                new EateryBusinessHours(
                    [
                        foundEateryBusinessHours[0],
                        foundEateryBusinessHours[1],
                    ],
                ),
                new EateryRegularHolidays(foundEatery._eateryRegularHolidays),
                new EateryImages(foundEatery._eateryImages),
            );
        });
    }
}
