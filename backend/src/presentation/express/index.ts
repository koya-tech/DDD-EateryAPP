import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;
app.use(cors({ origin: 'http://localhost:5173' }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

mongoose.connect(`mongodb+srv://${process.env.mongoDBUserName}:${process.env.mongoDBUserPassword}@dineappdb.bihid.mongodb.net/dev?retryWrites=true&w=majority&appName=DineAppDB`);
const db = mongoose.connection;
db.once('open', () => console.log('DB connection successful'));

app.use(express.json());
app.use('/api/v1', router);

// const repository = new MongooseUserRepository();

// const saltRounds = 10;
// const myPlaintextPassword = 's0/\\/\\P4$$w0rD';
// const salt = bcrypt.genSaltSync(saltRounds);
// const hashedPassword = bcrypt.hashSync(myPlaintextPassword, salt);

// Create a new blog post object
// const updateUser = User.create(
//     new UserId('66f2ea297585df342debd885'),
//     new UserName('test0925'),
//     new UserPassword(hashedPassword),
//     new UserImage('test.jpg0925'),
// );

// async function saveUser(user: User) {
//     const test = repository.save(user);
//     console.log(`saved Info${test}`);
// }
// saveUser(saveUserInfo);

// Insert the article in our MongoDB database
// savedUser.save();
// console.log('DONE');

// Get User Info
// async function getUser() {
//     const test = await repository.find(savedUser._id);
//     console.log(test);
//     return test;
// }
// getUser();

// Delete User Info
// async function deleteUser(userId: UserId) {
//     const test = await repository.deleteById(userId);
//     return test;
// }
// deleteUser(updateUser.userId);

// Update User Info
// const updateUser = User.create(
//     new UserId('66f2ea297585df342debd885'),
//     new UserName('test0925'),
//     new UserPassword(hashedPassword),
//     new UserImage('test.jpg0925'),
// );
// async function updateUserMethof(user: User) {
//     repository.update(user);
// }
// updateUserMethof(updateUser);
