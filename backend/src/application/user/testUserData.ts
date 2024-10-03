import bcrypt from 'bcrypt';
import User from '../../domain/entities/User';
import UserId from '../../domain/valueObject/user/UserId';
import UserImage from '../../domain/valueObject/user/UserImage';
import UserName from '../../domain/valueObject/user/UserName';
import UserPassword from '../../domain/valueObject/user/UserPassword';

// This is a sample user data for testing purposes
const sampleSaltRounds = 10;
const samplePassword = 'samplePassword';
const sampleSalt = bcrypt.genSaltSync(sampleSaltRounds);
const sampleHashedPassword = bcrypt.hashSync(samplePassword, sampleSalt);
const userId = new UserId('sample');
export const sampleUser = User.create(
    userId,
    new UserName('sample'),
    new UserPassword(sampleHashedPassword),
    new UserImage('sample.jpg'),
);

// This is a sample for update test data
const updateSaltRounds = 10;
const updatePassword = 'updatePassword';
const updateSalt = bcrypt.genSaltSync(updateSaltRounds);
const updateHashedPassword = bcrypt.hashSync(updatePassword, updateSalt);
export const updateUser = User.create(
    userId,
    new UserName('update'),
    new UserPassword(updateHashedPassword),
    new UserImage('update.jpg'),
);

// This is a sample for different test data
const differentSaltRounds = 10;
const differentPassword = 'differentPassword';
const differentSalt = bcrypt.genSaltSync(differentSaltRounds);
const differentHashedPassword = bcrypt.hashSync(differentPassword, differentSalt);
export const differentUser = User.create(
    new UserId('different'),
    new UserName('different'),
    new UserPassword(differentHashedPassword),
    new UserImage('different.jpg'),
);
