/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createContext, useMemo, useState } from 'react';
import { Button } from '../../shadcn/ui/button';
import { Form } from '../../shadcn/ui/form';
import NameInput from './components/nameInput/NameInput';
import { EateryCategoryEnum } from './components/type';
import CategorySelect from './components/categorySelect/CategorySelect';
import DescriptionTextarea from './components/descriptionTextarea/descriptionTextarea';
// eslint-disable-next-line import/no-cycle
import LeafletForm from './components/leafletForm/leafletForm';
import BusinessHourInput from './components/businessHourInput/businessHourInput';
import RegularHolidays from './components/regularHolidays/regularHolidays';
import ImageInput from './components/imageInput/ImageInput';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB

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
    eateryImages: z.instanceof(File).optional()
        .refine((file) => !file || file.size < MAX_UPLOAD_SIZE, 'File size must be less than 5MB')
        .refine((file) => !file || file.type.startsWith('image/'), 'File must be an image'),
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const locationContextValue = useMemo(() => ({ position, setPosition }), [position]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eateryName: '',
            eateryCategory: EateryCategoryEnum.Japanese,
            eateryDescription: '',
            // eateryAddress: '',
            eateryLocationLatitude: '',
            eateryLocationLongitude: '',
            // eateryCountry: EateryCountryEnum.Japan,
            eateryBusinessStartHour: '',
            eateryBusinessEndHour: '',
            eateryRegularHolidays: [],
            // eateryImages: [],
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const submitData = {
                ...values,
                eateryLocationLatitude: position.lat.toString(),
                eateryLocationLongitude: position.lng.toString(),
            };
            const response = await fetch('http://localhost:3001/api/v1/eatery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            if (!response.ok) {
                throw new Error('fail to send');
            }

            form.reset();
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <LocationContext.Provider value={locationContextValue}>
                    <NameInput form={form} />
                    <CategorySelect form={form} />
                    <DescriptionTextarea form={form} />
                    <LeafletForm />
                    <BusinessHourInput form={form} />
                    <RegularHolidays form={form} />
                    <ImageInput form={form} />
                </LocationContext.Provider>
                <Button
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? 'sending...' : 'submit'}
                </Button>
            </form>
        </Form>
    );
}

export default ShareForm;
