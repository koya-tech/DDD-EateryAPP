/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-misused-promises */

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

const formSchema = z.object({
    eateryName: z.string().min(1).max(50),
    eateryCategory: z.nativeEnum(EateryCategoryEnum),
    eateryDescription: z.string().min(1).max(500),
    eateryLocationLatitude: z.string(),
    eateryLocationLongitude: z.string(),
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
            eateryDescription: '',
            eateryLocationLatitude: '',
            eateryLocationLongitude: '',
            eateryBusinessStartHour: '',
            eateryBusinessEndHour: '',
            eateryRegularHolidays: [],
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/eatery`, {
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
      <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-md">
        <LocationContext.Provider value={locationContextValue}>
          <div className="space-y-6">
            <div className="space-y-2">
              <NameInput form={form} />
            </div>
            <div className="space-y-2">
              <CategorySelect form={form} />
            </div>
            <div className="space-y-2">
              <DescriptionTextarea
                form={form}
              />
            </div>
            <div className="space-y-2">
              <div className="border rounded-lg p-4 bg-gray-50">
                <LeafletForm />
              </div>
            </div>
            <div className="space-y-2">
              <BusinessHourInput form={form} />
            </div>
            <div className="space-y-2">
              <RegularHolidays form={form} />
            </div>
            <div className="space-y-2">
              <ImageInput form={form} />
            </div>
          </div>
        </LocationContext.Provider>
        <div className="pt-6">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full bg-black hover:bg-black/50 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            SHARE
          </Button>
        </div>
      </div>
    </Form>
    );
}

export default ShareForm;
