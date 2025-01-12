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
        label: 'SUNDAY',
    },
    {
        id: 'monday',
        label: 'MONDAY',
    },
    {
        id: 'tuesday',
        label: 'TUESDAY',
    },
    {
        id: 'wednesday',
        label: 'WEDNESDAY',
    },
    {
        id: 'thursday',
        label: 'THURSDAY',
    },
    {
        id: 'friday',
        label: 'FRIDAY',
    },
    {
        id: 'saturday',
        label: 'SATURDAY',
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
                    <div className="flex flex-wrap gap-4">
                        {daysOfWeek.map((day) => (
                            <FormField
                                key={day.id}
                                control={form.control}
                                name="eateryRegularHolidays"
                                render={({ field }) => (
                                    <FormItem
                                        key={day.id}
                                        className="flex items-center space-x-2"
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
                                            <div className="mb-2">
                                                {day.label}
                                            </div>
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </FormItem>
            )}
        />
    );
}

export default RegularHolidays;
