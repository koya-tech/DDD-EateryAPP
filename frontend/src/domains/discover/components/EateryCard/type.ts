type EateryCardProps = {
    eateryId: string;

    eateryName: string;

    eateryCategory: string;

    eateryDescription: string;

    // eateryRating: number;

    // eateryAddress: string;

    eateryLocation: number[];

    // eateryCountry: string;

    eateryBusinessStartHour: string;

    eateryBusinessEndHour: string;

    eateryRegularHolidays: string[];

    eateryImages: string[];

    onClick: () => void;

    onDelete?: (eateryId: string) => void;
};

export default EateryCardProps;
