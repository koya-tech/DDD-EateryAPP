/* eslint-disable react/jsx-props-no-spreading */

import {
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../../../shadcn/ui/form';
// eslint-disable-next-line import/no-cycle
import LeafletMap from './LeafletMap/LeafletMap';

function LeafletForm() {
    return (
        <FormItem>
            <FormLabel>Eatery Location</FormLabel>
            <FormDescription>
                Drop the pin to the eatery location
            </FormDescription>
            <FormMessage />
            <LeafletMap />
        </FormItem>
    );
}

export default LeafletForm;
