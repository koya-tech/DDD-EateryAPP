// src/__tests__/eatery.router.test.ts
import request from 'supertest';
import path from 'path';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import eateryRouter from './eateryRouter';

jest.mock('cloudinary');

describe('Eatery API Endpoints', () => {
    let mongoServer: MongoMemoryServer;
    let app: express.Application;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);

        app = express();
        app.use(express.json());
        app.use('/eatery', eateryRouter);

        (cloudinary.uploader.upload as jest.Mock).mockImplementation(() => Promise.resolve({
            secure_url: 'https://example.com/test-image.jpg',
        }));
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /eatery', () => {
        const validEateryData = {
            eateryName: 'Test Restaurant',
            eateryCategory: 'Japanese',
            eateryDescription: 'A test restaurant description',
            eateryLocationLatitude: '0',
            eateryLocationLongitude: '0',
            eateryBusinessStartHour: '09:00',
            eateryBusinessEndHour: '21:00',
            eateryRegularHolidays: '["sunday", "monday"]',
            userId: '12345',
        };

        it('should create a new eatery with images successfully', async () => {
            const response = await request(app)
                .post('/eatery/')
                .field('eateryName', validEateryData.eateryName)
                .field('eateryCategory', validEateryData.eateryCategory)
                .field('eateryDescription', validEateryData.eateryDescription)
                .field('eateryLocationLatitude', validEateryData.eateryLocationLatitude)
                .field('eateryLocationLongitude', validEateryData.eateryLocationLongitude)
                .field('eateryBusinessStartHour', validEateryData.eateryBusinessStartHour)
                .field('eateryBusinessEndHour', validEateryData.eateryBusinessEndHour)
                .field('eateryRegularHolidays', validEateryData.eateryRegularHolidays)
                .field('userId', validEateryData.userId)
                .attach('eateryImages', path.resolve(__dirname, '../../../../__mocks__/test-image-1.png'))
                .attach('eateryImages', path.resolve(__dirname, '../../../../__mocks__/test-image-2.png'));
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('POST /eatery');
            expect(cloudinary.uploader.upload).toHaveBeenCalledTimes(2);
        });

        it('should handle invalid file type', async () => {
            const response = await request(app)
                .post('/eatery')
                .field('eateryName', validEateryData.eateryName)
                .field('eateryCategory', validEateryData.eateryCategory)
                .field('eateryDescription', validEateryData.eateryDescription)
                .field('eateryLocationLatitude', validEateryData.eateryLocationLatitude)
                .field('eateryLocationLongitude', validEateryData.eateryLocationLongitude)
                .field('eateryBusinessStartHour', validEateryData.eateryBusinessStartHour)
                .field('eateryBusinessEndHour', validEateryData.eateryBusinessEndHour)
                .field('eateryRegularHolidays', validEateryData.eateryRegularHolidays)
                .field('userId', validEateryData.userId)
                .attach('eateryImages', path.resolve(__dirname, '../../../../__mocks__/invalid.txt'));

            expect(response.status).toBe(500);
            expect(response.text).toContain('Only image files are allowed');
        });

        it('should handle missing required fields', async () => {
            const response = await request(app)
                .post('/eatery')
                .field('eateryName', validEateryData.eateryName)
                // Missing other required fields
                .attach('eateryImages', path.resolve(__dirname, '../../../../__mocks__/test-image-1.png'));

            expect(response.status).toBe(400);
        });
    });
});

export default {
    config: jest.fn(),
    uploader: {
        upload: jest.fn().mockResolvedValue({
            secure_url: 'https://example.com/test-image.jpg',
        }),
    },
};
