import User from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repository/IUserRepository';
import UserDomainService from '../../../domain/service/UserDomainService';
import UserDTO from '../userDto';

export type GetUserCommand = {
    user: User;
};

export default class GetUserApplicationService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(command: GetUserCommand): Promise<UserDTO> {
        const userDomainService = await new UserDomainService(this.userRepository);

        const targetUser = await userDomainService.getUser(command.user.userId);

        return new UserDTO(targetUser);
    }
}
