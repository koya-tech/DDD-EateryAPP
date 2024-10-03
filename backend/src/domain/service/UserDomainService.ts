import User from '../entities/User';
import { IUserRepository } from '../repository/IUserRepository';
import UserId from '../valueObject/user/UserId';

export default class UserDomainService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    // already exist same data → true, no exist → false
    async IsUserNameDuplicate(userId: UserId) {
        const duplicateUserName = await this.userRepository.getById(userId);
        const isDuplicateUserName = !!duplicateUserName;
        return isDuplicateUserName;
    }

    async registerUser(user: User): Promise<void> {
        if (await this.IsUserNameDuplicate(user.userId)) {
            throw new Error('UserName is already in use.');
        }
        await this.userRepository.register(user);
    }

    async deleteUser(userId: UserId): Promise<void> {
        const targetUser = await this.userRepository.getById(userId);
        if (!targetUser) {
            throw new Error('User not found.');
        }
        await this.userRepository.deleteById(targetUser.userId);
    }

    async updateUser(user: User): Promise<void> {
        const targetUser = await this.userRepository.getById(user.userId);
        if (!targetUser) {
            throw new Error('User not found.');
        }
        await this.userRepository.update(user);
    }

    async getUser(userId: UserId): Promise<User> {
        const targetUser = await this.userRepository.getById(userId);
        if (!targetUser) {
            throw new Error('User not found.');
        }
        return targetUser;
    }
}
