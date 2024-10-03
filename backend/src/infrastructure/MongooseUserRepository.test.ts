/* eslint-disable eqeqeq */
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../domain/entities/User';
import MongooseUserRepository from './MongooseUserRepository';
import UserId from '../domain/valueObject/user/UserId';
import UserName from '../domain/valueObject/user/UserName';
import UserImage from '../domain/valueObject/user/UserImage';
import UserPassword from '../domain/valueObject/user/UserPassword';

dotenv.config({ path: '.env.local' });

beforeAll(async () => {
    await mongoose.connect(`mongodb+srv://${process.env.mongoDBUserName}:${process.env.mongoDBUserPassword}@dineappdb.bihid.mongodb.net/?retryWrites=true&w=majority&appName=DineAppDB`);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('MongooseUserRepository', () => {
    beforeEach(async () => {
        await mongoose.connection.db.collection('users').deleteMany({});
    });

    const repository = new MongooseUserRepository();

    const saltRounds = 10;
    const myPlaintextPassword = 's0/\\/\\P4$$w0rD';
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(myPlaintextPassword, salt);

    const userId = new UserId('abcefghijk');
    const userName = new UserName('testtest');
    const userPassword = new UserPassword(hashedPassword);
    const userImage = new UserImage('test.jpg');

    const user = User.create(
        userId,
        userName,
        userPassword,
        userImage,
    );

    test('can get info which repo did save', async () => {
        await repository.register(user);

        const userList = await repository.get();
        if (userList === null) {
            throw new Error('failed to read UserInfo');
        }
        const createdEntity = await repository.getById(userList[0].userId);

        expect(createdEntity?.userName.equals(userName)).toBeTruthy();
        expect(createdEntity?.userPassword.equals(userPassword)).toBeTruthy();
        expect(createdEntity?.userImage.equals(userImage)).toBeTruthy();
    });

    test('can update about user info', async () => {
        await repository.register(user);

        const userList = await repository.get();
        if (userList === null) {
            throw new Error('failed to read UserInfo');
        }
        const updatedsaltRounds = 10;
        const updatedmyPlaintextPassword = 's0/\\/\\P4$$w0rDupdate';
        const updatedsalt = bcrypt.genSaltSync(updatedsaltRounds);
        const updatedhashedPassword = bcrypt.hashSync(updatedmyPlaintextPassword, updatedsalt);

        const updatedUserName = new UserName('testtest2');
        const updatedUserPassword = new UserPassword(updatedhashedPassword);
        const updatedUserImage = new UserImage('test2.jpg');

        const updatedUser = User.reconstruct(
            userList[0].userId,
            updatedUserName,
            updatedUserPassword,
            updatedUserImage,
        );
        await repository.update(updatedUser);

        const createdEntity = await repository.getById(userList[0].userId);
        expect(createdEntity?.userName.equals(updatedUserName)).toBeTruthy();
        expect(createdEntity?.userPassword.equals(updatedUserPassword)).toBeTruthy();
        expect(createdEntity?.userImage.equals(updatedUserImage)).toBeTruthy();
    });

    test('can delete user info', async () => {
        await repository.register(user);

        const userList = await repository.get();
        if (userList === null) {
            throw new Error('failed to read UserInfo');
        }
        await repository.deleteById(userList[0].userId);
        const userListAfterDelete = await repository.get();
        expect(userListAfterDelete).toBeNull();
    });
});
