import { IUserRepository } from '../../../domain/repository/IUserRepository';
import UserDomainService from '../../../domain/service/UserDomainService';
import UserId from '../../../domain/valueObject/user/UserId';

export type DeleteUserCommand = {
    userId: string;
};

export default class DeleteUserApplicationService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(command: DeleteUserCommand): Promise<void> {
        const userDomainService = await new UserDomainService(this.userRepository);

        await userDomainService.deleteUser(new UserId(command.userId));
    }
}
