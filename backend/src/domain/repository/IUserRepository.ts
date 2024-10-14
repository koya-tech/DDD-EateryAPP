import User from '../entities/User';
import UserId from '../valueObject/user/UserId';
import UserName from '../valueObject/user/UserName';

export interface IUserRepository {

    register(user: User): Promise<void>;

    update(user: User): Promise<void>;

    deleteById(userId: UserId): Promise<void>;

    getById(userId: UserId): Promise<User | null>;

    getByUserName(userName: UserName): Promise<User | null>;

    get(): Promise<User[] | null>;
}
