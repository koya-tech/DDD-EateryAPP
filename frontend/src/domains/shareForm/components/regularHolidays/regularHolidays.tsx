import { Checkbox } from '../../../../shadcn/ui/checkbox';
import {
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormControl,
} from '../../../../shadcn/ui/form';
import { EateryFormProps } from '../type';

const daysOfWeek = [
    {
        id: 'sunday',
        label: 'sunday',
    },
    {
        id: 'monday',
        label: 'monday',
    },
    {
        id: 'tuesday',
        label: 'tuesday',
    },
    {
        id: 'wednesday',
        label: 'wednesday',
    },
    {
        id: 'thursday',
        label: 'thursday',
    },
    {
        id: 'friday',
        label: 'friday',
    },
    {
        id: 'saturday',
        label: 'saturday',
    },
] as const;

function RegularHolidays({ form }: EateryFormProps) {
    return (
        <FormField
            control={form.control}
            name="eateryRegularHolidays"
            render={() => (
                <FormItem>
                    <div className="mb-4">
                        <FormLabel className="text-base">Business Holiday</FormLabel>
                        <FormDescription>
                            Select the holiday that the store is closed.
                        </FormDescription>
                    </div>
                    {daysOfWeek.map((day) => (
                        <FormField
                            key={day.id}
                            control={form.control}
                            name="eateryRegularHolidays"
                            render={({ field }) => (
                                <FormItem
                                    key={day.id}
                                    className="flex items-center space-x-4"
                                >
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value.includes(day.id)}
                                            onCheckedChange={(checked) => (checked
                                                ? field.onChange(
                                                    [...field.value, day.id],
                                                )
                                                : field.onChange(
                                                    field.value.filter(
                                                        (item) => item !== day.id,
                                                    ),
                                                ))}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {day.label}
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    ))}
                </FormItem>
            )}
        />
    );
}

export default RegularHolidays;
