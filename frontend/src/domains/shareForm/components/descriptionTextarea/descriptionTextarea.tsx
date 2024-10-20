/* eslint-disable react/jsx-props-no-spreading */
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '../../../../shadcn/ui/form';
import { Textarea } from '../../../../shadcn/ui/textarea';
import { EateryFormProps } from '../type';

function DescriptionTextarea({ form }: EateryFormProps) {
    return (
        <FormField
            control={form.control}
            name="eateryDescription"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Eatery Description</FormLabel>
                    <FormControl>
                        <Textarea
                            id="eateryDescription"
                            placeholder="Tell us a little bit about your eatery"
                            className="resize-none"
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        This is your public display Description.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
export default DescriptionTextarea;
