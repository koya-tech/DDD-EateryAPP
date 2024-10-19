import Eatery from '../entities/Eatery';
import { IEateryRepository } from '../repository/IEateryRepository';
import EateryId from '../valueObject/eatery/EateryId';

export default class EateryDomainService {
    constructor(
        private eateryRepository: IEateryRepository,
    ) { }

    // already exist same data → true, no exist → false
    // async IsEateryNameDuplicate(eatery: Eatery) {
    //     const duplicateEateryName = await this.eateryRepository.getById(eatery.eateryId);
    //     const isDuplicateEateryName = !!duplicateEateryName;
    //     return isDuplicateEateryName;
    // }

    async registerEatery(eatery: Eatery): Promise<Eatery> {
        //* need this check ?
        // if (await this.IsEateryNameDuplicate(eatery)) {
        //     throw new Error('EateryName is already in use.');
        // }
        await this.eateryRepository.register(eatery);
        return eatery;
    }

    async deleteEatery(eatery: Eatery): Promise<void> {
        const targetEatery = await this.eateryRepository.getById(eatery.eateryId);
        if (!targetEatery) {
            throw new Error('Eatery not found.');
        }
        await this.eateryRepository.deleteById(targetEatery.eateryId);
    }

    async updateEatery(eatery: Eatery): Promise<void> {
        const targetEatery = await this.eateryRepository.getById(eatery.eateryId);
        if (!targetEatery) {
            throw new Error('Eatery not found.');
        }
        await this.eateryRepository.update(eatery);
    }

    async getEatery(eateryId: EateryId): Promise<Eatery> {
        const targetEatery = await this.eateryRepository.getById(eateryId);
        if (!targetEatery) {
            throw new Error('Eatery not found.');
        }
        return targetEatery;
    }
}
