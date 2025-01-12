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
