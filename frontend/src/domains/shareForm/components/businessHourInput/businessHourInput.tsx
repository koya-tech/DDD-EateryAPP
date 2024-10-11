/* eslint-disable react/jsx-props-no-spreading */
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '../../../../shadcn/ui/form';
import { Input } from '../../../../shadcn/ui/input';
import { EateryFormProps } from '../type';

function BusinessHourInput({ form }: EateryFormProps) {
    return (
        <div className="flex">
            <FormField
                control={form.control}
                name="eateryBusinessStartHour"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Start Hour</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Start Hour" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <p>  ~  </p>
            <FormField
                control={form.control}
                name="eateryBusinessEndHour"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business End Hour</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter End Hour" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
export default BusinessHourInput;
