import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '../../../../shadcn/ui/select';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '../../../../shadcn/ui/form';
import { EateryFormProps } from '../type';

function CategorySelect({ form }: EateryFormProps) {
    return (
        <FormField
            control={form.control}
            name="eateryCategory"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Eatery Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger id="eateryCategory">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="JPN">Japanese</SelectItem>
                            <SelectItem value="CHN">Chinese</SelectItem>
                            <SelectItem value="ITA">Italian</SelectItem>
                            <SelectItem value="WST">Western</SelectItem>
                            <SelectItem value="OTH">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        This is your public display Category.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default CategorySelect;
