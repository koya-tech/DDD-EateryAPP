import Eatery from '../entities/Eatery';
import { IEateryRepository } from '../repository/IEateryRepository';
import EateryId from '../valueObject/eatery/EateryId';

export default class EateryDomainService {
    constructor(
        private eateryRepository: IEateryRepository,
    ) { }

    async registerEatery(eatery: Eatery): Promise<Eatery> {
        await this.eateryRepository.register(eatery);
        return eatery;
    }

    async deleteEatery(eateryId: EateryId): Promise<void> {
        console.log('eateryId@EateryDomainService', eateryId);
        const targetEatery = await this.eateryRepository.getById(eateryId);
        console.log('targetEatery@EateryDomainService', targetEatery);
        if (!targetEatery) {
            throw new Error('Eatery not found.');
        }
        await this.eateryRepository.deleteById(eateryId);
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

    async getAllEateries(): Promise<Eatery[]> {
        const eateries = await this.eateryRepository.get();
        console.log('eateries@EateryDomainService', eateries);
        if (!eateries) {
            return [];
        }
        return eateries;
    }
}
