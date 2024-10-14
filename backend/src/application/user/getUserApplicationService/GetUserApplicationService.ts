import { IUserRepository } from '../../../domain/repository/IUserRepository';
import UserDomainService from '../../../domain/service/UserDomainService';
import UserId from '../../../domain/valueObject/user/UserId';
import UserDTO from '../userDto';

export type GetUserCommand = {
    userId: string;
};

export default class GetUserApplicationService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(command: GetUserCommand): Promise<UserDTO> {
        const userDomainService = await new UserDomainService(this.userRepository);

        const targetUser = await userDomainService.getUser(new UserId(command.userId));

        return new UserDTO(targetUser);
    }
}
