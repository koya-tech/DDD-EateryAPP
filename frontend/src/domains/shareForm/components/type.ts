/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form';

export interface EateryFormValues {
    // eateryAddress: string;
    eateryName: string;
    eateryCategory: EateryCategoryEnum;
    eateryDescription: string;
    eateryLocationLatitude: string;
    eateryLocationLongitude: string;
    // eateryCountry: EateryCountryEnum;
    eateryBusinessStartHour: string;
    eateryBusinessEndHour: string;
    eateryRegularHolidays: string[];
    eateryImages?: FileList;
}

export interface EateryFormProps {
    form: UseFormReturn<{
        eateryName: string;
        eateryCategory: EateryCategoryEnum;
        eateryDescription: string;
        eateryLocationLatitude: string;
        eateryLocationLongitude: string;
        eateryBusinessStartHour: string;
        eateryBusinessEndHour: string;
        eateryRegularHolidays: string[];
        eateryImages?: FileList | undefined;
    }, any, undefined>;
    // form: UseFormReturn<EateryFormValues, any, undefined>;
}

export enum EateryCategoryEnum {
    Japanese = 'Japanese',
    Chinese = 'Chinese',
    Italian = 'Italian',
    Western = 'Western',
    Other = 'Other',
}

export enum EateryCountryEnum {
    Japan = 'JPN',
    Canada = 'CAN',
}
