import Eatery from '../../../domain/entities/Eatery';
import { IEateryRepository } from '../../../domain/repository/IEateryRepository';
import EateryDomainService from '../../../domain/service/EateryDomainService';
import EateryBusinessHours from '../../../domain/valueObject/eatery/EateryBusinessHours';
import EateryCategory from '../../../domain/valueObject/eatery/EateryCategory';
import EateryDescription from '../../../domain/valueObject/eatery/EateryDescription';
import EateryId from '../../../domain/valueObject/eatery/EateryId';
import EateryImages from '../../../domain/valueObject/eatery/EateryImages';
import EateryLocation from '../../../domain/valueObject/eatery/EateryLocation';
import EateryName from '../../../domain/valueObject/eatery/EateryName';
import EateryRegularHolidays from '../../../domain/valueObject/eatery/EateryRegularHolidays';

export type RegisterEateryCommand = {
    eatery: {
        eateryName: string;
        eateryCategory: string;
        eateryDescription: string;
        eateryLocationLatitude: string;
        eateryLocationLongitude: string;
        eateryBusinessStartHour: string;
        eateryBusinessEndHour: string;
        eateryRegularHolidays: string[];
        eateryImages: string[];
    };
};

export default class RegisterEateryApplicationService {
    constructor(
        private eateryRepository: IEateryRepository,
    ) { }

    async execute(command: RegisterEateryCommand): Promise<void> {
        const eateryDomainService = await new EateryDomainService(this.eateryRepository);

        await eateryDomainService.registerEatery(Eatery.create(
            new EateryId('ThisIsTemporaryId'),
            new EateryName(command.eatery.eateryName),
            new EateryCategory(command.eatery.eateryCategory),
            new EateryDescription(command.eatery.eateryDescription),
            new EateryLocation([
                parseFloat(command.eatery.eateryLocationLongitude),
                parseFloat(command.eatery.eateryLocationLatitude),
            ]),
            new EateryBusinessHours([
                command.eatery.eateryBusinessStartHour,
                command.eatery.eateryBusinessEndHour,
            ]),
            new EateryRegularHolidays(command.eatery.eateryRegularHolidays),
            new EateryImages(command.eatery.eateryImages),
        ));
    }
}
