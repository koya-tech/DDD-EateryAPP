import { IEateryRepository } from '../../../domain/repository/IEateryRepository';
import EateryDomainService from '../../../domain/service/EateryDomainService';
import EateryId from '../../../domain/valueObject/eatery/EateryId';

export type DeleteEateryCommand = {
    eateryId: string;
};

export default class DeleteEateryApplicationService {
    constructor(
        private eateryRepository: IEateryRepository,
    ) { }

    async execute(command: DeleteEateryCommand): Promise<void> {
        const eateryDomainService = await new EateryDomainService(this.eateryRepository);
        const eateryId = new EateryId(command.eateryId);
        console.log('eateryId@DeleteEateryApplicationService', eateryId);
        await eateryDomainService.deleteEatery(eateryId);
    }
}
