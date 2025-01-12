import type { Meta, StoryObj } from '@storybook/react';
import EateryCard from './EateryCard';

const meta: Meta<typeof EateryCard> = {
    component: EateryCard,
};

export default meta;
type Story = StoryObj<typeof EateryCard>;

export const Primary: Story = {
    args: {
    eateryId: '1',
    eateryName: 'Pacific Breeze Bistro',
    eateryCategory: 'Seafood',
    eateryDescription: 'A cozy waterfront bistro offering fresh, sustainable seafood dishes with a Pacific Northwest twist. Perfect for a casual lunch or a romantic dinner.',
    eateryBusinessStartHour: '11:00',
    eateryBusinessEndHour: '22:00',
    eateryRegularHolidays: ['Monday'],
        eateryImages: ['/discover.jpg'],
    },
};
