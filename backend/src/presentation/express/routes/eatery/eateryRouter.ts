import { Router } from 'express';
import multer from 'multer';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import MongooseEateryRepository from '../../../../infrastructure/MongooseEateryRepository';
import RegisterEateryApplicationService, { RegisterEateryCommand } from '../../../../application/eatery/registerEateryApplicationService/RegisterEateryApplicationService';

const eateryRouter = Router();
const repository = new MongooseEateryRepository();

dotenv.config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    // eslint-disable-next-line consistent-return
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    },
});

eateryRouter.post('/', upload.array('eateryImages', 2), async (req, res) => {
    try {
        const {
            eateryName,
            eateryCategory,
            eateryDescription,
            eateryLocationLatitude,
            eateryLocationLongitude,
            eateryBusinessStartHour,
            eateryBusinessEndHour,
            eateryRegularHolidays: eateryRegularHolidaysParsed,
        } = req.body as {
            eateryName: string;
            eateryCategory: string;
            eateryDescription: string;
            eateryLocationLatitude: string;
            eateryLocationLongitude: string;
            eateryBusinessStartHour: string;
            eateryBusinessEndHour: string;
            eateryRegularHolidays: string;
        };
        console.log(req.body);
        const eateryRegularHolidays = JSON.parse(eateryRegularHolidaysParsed) as string[];
        console.log(eateryRegularHolidays);
        let imageUrl: string[] = [];

        if (req.files && Array.isArray(req.files)) {
            try {
                const uploadPromises = req.files.map(async (file) => {
                    try {
                        const result = await cloudinary.uploader.upload(file.path, {
                            folder: 'eateries',
                        });
                        console.log(file.path);
                        await fs.promises.unlink(file.path);
                        return result.secure_url;
                    } catch (error) {
                        console.error('Error processing file:', error);
                        throw error;
                    }
                });
                const uploadedUrls = await Promise.all(uploadPromises);
                imageUrl = uploadedUrls;
            } catch (error) {
                throw new Error('Failed to upload images');
            }
        }

        const eatery = {
            eateryName,
            eateryCategory,
            eateryDescription,
            eateryLocationLatitude,
            eateryLocationLongitude,
            eateryBusinessStartHour,
            eateryBusinessEndHour,
            eateryRegularHolidays,
            eateryImages: imageUrl || [],
        };
        console.log(eatery);

        const registerEateryApplicationService = new RegisterEateryApplicationService(repository);
        const registerEateryCommand: RegisterEateryCommand = {
            eatery,
        };

        await registerEateryApplicationService.execute(registerEateryCommand);

        res.status(200).json({ message: 'POST /eatery' });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: (error as Error).message });
    }
});

export default eateryRouter;
