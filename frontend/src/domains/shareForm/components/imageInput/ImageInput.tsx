/* eslint-disable react/jsx-props-no-spreading */
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '../../../../shadcn/ui/form';
import { Input } from '../../../../shadcn/ui/input';
import { EateryFormProps } from '../type';

function ImageInput({ form }: EateryFormProps) {
    const fileRef = form.register('eateryImages');
    return (
        <FormField
            control={form.control}
            name="eateryImages"
            render={() => (
                <FormItem>
                    <FormLabel>Eatery Images</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" {...fileRef} />
                    </FormControl>
                    <FormDescription>
                        This is your public display images. File size must be less than 5MB
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default ImageInput;
