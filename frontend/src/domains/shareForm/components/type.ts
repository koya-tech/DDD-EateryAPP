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
    // eateryImages: string[];
}

export interface EateryFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<EateryFormValues, any, undefined>;
}

export enum EateryCategoryEnum {
    Japanese = 'JPN',
    Chinese = 'CHN',
    Italian = 'ITA',
    Western = 'WST',
    Other = 'OTH',
}

export enum EateryCountryEnum {
    Japan = 'JPN',
    Canada = 'CAN',
}
