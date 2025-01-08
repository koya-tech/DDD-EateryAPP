import Eatery from '../../domain/entities/Eatery';
import { IEateryRepository } from '../../domain/repository/IEateryRepository';
import EateryId from '../../domain/valueObject/eatery/EateryId';

export default class InMemoryEateryRepository implements IEateryRepository {
    public DB: {
        [id: string]: Eatery;
    } = {};

    async register(eateryInfo: Eatery) {
        //! this ID is the same testEateryData.ts. If you change this ID, please check
        const id = 'abcdef';
        this.DB[id] = Eatery.create(
            new EateryId(id),
            eateryInfo.eateryName,
            eateryInfo.eateryCategory,
            eateryInfo.eateryDescription,
            eateryInfo.eateryLocation,
            eateryInfo.eateryBusinessHours,
            eateryInfo.eateryRegularHolidays,
            eateryInfo.eateryImages,
        );
    }

    async update(eatery: Eatery) {
        this.DB[eatery.eateryId.value.toString()] = eatery;
    }

    async deleteById(eateryId: EateryId) {
        delete this.DB[eateryId.value.toString()];
    }

    async getById(eateryId: EateryId): Promise<Eatery | null> {
        const targetEatery = Object.entries(this.DB)
            .find(([id]) => eateryId.value.toString() === this.DB[id]
                .eateryId.value.toString());

        return targetEatery ? targetEatery[1] : null;
    }

    async get(): Promise<Eatery[] | null> {
        return Object.entries(this.DB).map((pair) => pair[1]);
    }

    async clean() {
        this.DB = {};
    }
}
