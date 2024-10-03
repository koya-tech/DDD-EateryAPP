import Eatery from '../../../domain/entities/Eatery';
import { IEateryRepository } from '../../../domain/repository/IEateryRepository';
import EateryDomainService from '../../../domain/service/EateryDomainService';
import EateryDTO from '../eateryDto';

export type GetEateryCommand = {
    eatery: Eatery;
};

export default class GetEateryApplicationService {
    constructor(
        private eateryRepository: IEateryRepository,
    ) { }

    async execute(command: GetEateryCommand): Promise<EateryDTO> {
        const eateryDomainService = await new EateryDomainService(this.eateryRepository);

        const targetEatery = await eateryDomainService.getEatery(command.eatery.eateryId);

        return new EateryDTO(targetEatery);
    }
}
