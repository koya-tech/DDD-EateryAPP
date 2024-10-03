import Eatery from '../entities/Eatery';
import EateryId from '../valueObject/eatery/EateryId';

export interface IEateryRepository {

    register(eatery: Eatery): Promise<void>;

    update(eatery: Eatery): Promise<void>;

    deleteById(eateryId: EateryId): Promise<void>;

    getById(eateryId: EateryId): Promise<Eatery | null>;

    get(): Promise<Eatery[] | null>;
}
