import mongoose, { Schema } from 'mongoose';
import MongodbSetting from '../../../infrastructure/MongodbSetting';

const eaterySchema = new Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        require: true,
    },
    _eateryName: { type: String, required: true },
    _eateryCategory: { type: String, required: true },
    _eateryDescription: { type: String, required: true },
    _eateryLocation: {
        type: {
            type: String,
            enum: [MongodbSetting.geoJsonType],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator(value: number[]) {
                    return value.length === 2;
                },
                message: 'Eatery location must contain exactly two numbers (latitude and longitude).',
            },
        },
    },
    _eateryBusinessHours: {
        type: [String],
        required: true,
        validate: {
            validator(value: string[]) {
                return value.length === 2;
            },
            message: 'Eatery businessHour must contain exactly two string (start and end).',
        },
    },
    _eateryRegularHolidays: {
        type: [String],
        required: true,
    },
    _eateryImages: {
        type: [String],
        required: true,
    },
});

eaterySchema.index({ _eateryLocation: '2dsphere' });

const EateryModel = mongoose.model('Eatery', eaterySchema);

export default EateryModel;
