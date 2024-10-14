import User from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repository/IUserRepository';
import UserId from '../../domain/valueObject/user/UserId';
import UserName from '../../domain/valueObject/user/UserName';

export default class InMemoryUserRepository implements IUserRepository {
    public DB: {
        [id: string]: User;
    } = {};

    async register(user: User) {
        this.DB[user.userId.value.toString()] = user;
    }

    async update(user: User) {
        this.DB[user.userId.value.toString()] = user;
    }

    async deleteById(userId: UserId) {
        delete this.DB[userId.value.toString()];
    }

    async getById(userId: UserId): Promise<User | null> {
        const targetUser = Object.entries(this.DB)
            .find(([id]) => userId.value.toString() === id);

        return targetUser ? targetUser[1] : null;
    }

    async getByUserName(userName: UserName): Promise<User | null> {
        const targetUser = Object.entries(this.DB)
            .find(([, user]) => user.userName.value === userName.value);

        return targetUser ? targetUser[1] : null;
    }

    async get(): Promise<User[] | null> {
        return Object.entries(this.DB).map((pair) => pair[1]);
    }

    // for testing
    async clean(): Promise<void> {
        this.DB = {};
    }
}
