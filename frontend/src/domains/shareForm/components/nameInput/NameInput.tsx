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

function NameInput({ form }: EateryFormProps) {
    return (
        <FormField
            control={form.control}
            name="eateryName"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Eatery Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter Eatery Name" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default NameInput;
