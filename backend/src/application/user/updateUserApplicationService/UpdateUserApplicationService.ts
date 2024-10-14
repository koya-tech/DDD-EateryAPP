import User from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repository/IUserRepository';
import UserDomainService from '../../../domain/service/UserDomainService';
import UserId from '../../../domain/valueObject/user/UserId';
import UserImage from '../../../domain/valueObject/user/UserImage';
import UserName from '../../../domain/valueObject/user/UserName';
import UserPassword from '../../../domain/valueObject/user/UserPassword';

export type UpdateUserCommand = {
    user: {
        userId: string;
        userName: string;
        userPassword: string;
        userImage: string;
    };
};

export default class UpdateUserApplicationService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(command: UpdateUserCommand): Promise<void> {
        const userDomainService = new UserDomainService(this.userRepository);

        await userDomainService.updateUser(User.create(
            new UserId(command.user.userId),
            new UserName(command.user.userName),
            new UserPassword(command.user.userPassword),
            new UserImage(command.user.userImage),
        ));
    }
}
