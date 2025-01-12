type EateryCardProps = {
    eateryId: string;

    eateryName: string;

    eateryCategory: string;

    eateryDescription: string;

    eateryLocation: number[];

    eateryBusinessStartHour: string;

    eateryBusinessEndHour: string;

    eateryRegularHolidays: string[];

    eateryImages: string[];

    onClick: () => void;

    onDelete?: (eateryId: string) => void;
};

export default EateryCardProps;
