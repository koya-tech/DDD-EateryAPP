import User from '../domain/entities/User';
import { IUserRepository } from '../domain/repository/IUserRepository';
import UserId from '../domain/valueObject/user/UserId';
import UserImage from '../domain/valueObject/user/UserImage';
import UserName from '../domain/valueObject/user/UserName';
import UserPassword from '../domain/valueObject/user/UserPassword';
import UserModel from '../external/mongoose/model/UserModel';

export default class MongooseUserRepository implements IUserRepository {
    // eslint-disable-next-line class-methods-use-this
    async register(user: User): Promise<void> {
        const savedUser = new UserModel({
            _userName: user.userName.value,
            _userPassword: user.userPassword.value,
            _userImage: user.userImage.value,
        });
        await savedUser.save();
    }

    // eslint-disable-next-line class-methods-use-this
    async update(user: User): Promise<void> {
        const updatedUser = await UserModel.findByIdAndUpdate(
            user.userId.value,
            {
                _userName: user.userName.value,
                _userPassword: user.userPassword.value,
                _userImage: user.userImage.value,
            },
            { new: true },
        ).exec();

        if (!updatedUser) {
            throw new Error('User not found or update failed');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async deleteById(userId: UserId): Promise<void> {
        const result = await UserModel.findByIdAndDelete(userId.value).exec();

        if (!result) {
            throw new Error('User not found or delete failed');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async getById(userId: UserId): Promise<User | null> {
        const foundUser = await UserModel.findById(userId.value).exec();
        if (!foundUser) {
            throw new Error('User not Found.');
        }

        return User.reconstruct(
            new UserId(foundUser._id),
            new UserName(foundUser._userName),
            new UserPassword(foundUser._userPassword),
            new UserImage(foundUser._userImage),
        );
    }

    // eslint-disable-next-line class-methods-use-this
    async getByUserName(userName: UserName): Promise<User | null> {
        const foundUser = await UserModel.findOne({
            _userName: userName.value,
        });

        if (!foundUser) {
            // throw new Error('UserName not Found.');
            return null;
        }

        return User.reconstruct(
            new UserId(foundUser._id),
            new UserName(foundUser._userName),
            new UserPassword(foundUser._userPassword),
            new UserImage(foundUser._userImage),
        );
    }

    // for admin and test purpose
    // eslint-disable-next-line class-methods-use-this
    async get(): Promise<User[] | null> {
        const users = await UserModel.find().exec();
        if (!users || users.length === 0) {
            return null;
        }

        return users.map((user) => User.reconstruct(
            new UserId(user._id),
            new UserName(user._userName),
            new UserPassword(user._userPassword),
            new UserImage(user._userImage),
        ));
    }
}
