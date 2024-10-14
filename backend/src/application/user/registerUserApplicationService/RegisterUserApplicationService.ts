import User from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repository/IUserRepository';
import UserDomainService from '../../../domain/service/UserDomainService';
import UserId from '../../../domain/valueObject/user/UserId';
import UserImage from '../../../domain/valueObject/user/UserImage';
import UserName from '../../../domain/valueObject/user/UserName';
import UserPassword from '../../../domain/valueObject/user/UserPassword';

export type RegisterUserCommand = {
    user: {
        userName: string;
        userPassword: string;
        userImage: string;
    };
};

export default class RegisterUserApplicationService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async execute(command: RegisterUserCommand): Promise<void> {
        const userDomainService = new UserDomainService(this.userRepository);

        await userDomainService.registerUser(User.create(
            new UserId('ThisIsTemporaryId'),
            new UserName(command.user.userName),
            new UserPassword(command.user.userPassword),
            new UserImage(command.user.userImage),
        ));
    }
}
