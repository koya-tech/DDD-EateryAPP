/* eslint-disable react/jsx-props-no-spreading */
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../shadcn/ui/form';
import { Input } from '../../../../shadcn/ui/input';
import { EateryFormProps } from '../type';

function ImageInput({ form }: EateryFormProps) {
    return (
        <FormField
            control={form.control}
            name="eateryImages"
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel htmlFor="image">Upload Image</FormLabel>
                    <Input type="file" id="image" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                    {fieldState.error
                        && <FormMessage>{fieldState.error.message}</FormMessage>}
                </FormItem>
            )}
        />
    );
}

export default ImageInput;
