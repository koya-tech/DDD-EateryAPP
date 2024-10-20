/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createContext, useMemo, useState } from 'react';
import { Button } from '../../shadcn/ui/button';
import {
    Form,
} from '../../shadcn/ui/form';
import DescriptionTextarea from './components/descriptionTextarea/descriptionTextarea';
import { EateryCategoryEnum } from './components/type';
import BusinessHourInput from './components/businessHourInput/businessHourInput';
import CategorySelect from './components/categorySelect/CategorySelect';
// eslint-disable-next-line import/no-cycle
import LeafletForm from './components/leafletForm/leafletForm';
import NameInput from './components/nameInput/NameInput';
import RegularHolidays from './components/regularHolidays/regularHolidays';
import ImageInput from './components/imageInput/ImageInput';

// const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB

const formSchema = z.object({
    eateryName: z.string().min(1).max(50),
    eateryCategory: z.nativeEnum(EateryCategoryEnum),
    eateryDescription: z.string().min(1).max(500),
    // eateryAddress: z.string().min(1).max(100),
    eateryLocationLatitude: z.string(),
    eateryLocationLongitude: z.string(),
    // eateryCountry: z.nativeEnum(EateryCountryEnum),
    eateryBusinessStartHour: z.string(),
    eateryBusinessEndHour: z.string(),
    eateryRegularHolidays: z.array(z.string()),
    eateryImages: z.instanceof(FileList).optional()
        .refine((files) => files && files.length > 0, { message: 'Image is required' }),
});

const center = {
    lat: 35,
    lng: 139,
};

export const LocationContext = createContext<{
    position: { lat: number; lng: number };
    setPosition: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}>({
    position: center,
    setPosition: () => { },
});

function ShareForm() {
    const [position, setPosition] = useState(center);
    const locationContextValue = useMemo(() => ({ position, setPosition }), [position]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eateryName: '',
            // eateryCategory: EateryCategoryEnum.Japanese,
            eateryDescription: '',
            // eateryAddress: '',
            eateryLocationLatitude: '',
            eateryLocationLongitude: '',
            // eateryCountry: EateryCountryEnum.Japan,
            eateryBusinessStartHour: '',
            eateryBusinessEndHour: '',
            eateryRegularHolidays: [],
            // eateryImages: FileList[],
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('eateryName', data.eateryName);
        formData.append('eateryCategory', data.eateryCategory);
        formData.append('eateryDescription', data.eateryDescription);
        formData.append('eateryLocationLatitude', position.lat.toString());
        formData.append('eateryLocationLongitude', position.lng.toString());
        formData.append('eateryBusinessStartHour', data.eateryBusinessStartHour);
        formData.append('eateryBusinessEndHour', data.eateryBusinessEndHour);
        formData.append('eateryRegularHolidays', JSON.stringify(data.eateryRegularHolidays));
        if (data.eateryImages && data.eateryImages.length > 0) {
            formData.append('eateryImages', data.eateryImages[0]);
        }

        try {
            const response = await fetch('http://localhost:3001/api/v1/eatery', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File successfully uploaded');
            } else {
                console.error('Error uploading file');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Form {...form}>
            <LocationContext.Provider value={locationContextValue}>
                <NameInput form={form} />
                <CategorySelect form={form} />
                <DescriptionTextarea form={form} />
                <LeafletForm />
                <BusinessHourInput form={form} />
                <RegularHolidays form={form} />
                <ImageInput form={form} />
            </LocationContext.Provider>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
        </Form>
    );
}

export default ShareForm;
