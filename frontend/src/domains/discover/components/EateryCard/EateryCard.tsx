import EateryCardProps from './type';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../shadcn/ui/card';

function EateryCard({ onClick, ...eateryCardProps }: EateryCardProps) {
    const {
        // eateryId,
        eateryName,
        eateryCategory,
        eateryDescription,
        // eateryLocation,
        eateryBusinessStartHour,
        eateryBusinessEndHour,
        eateryRegularHolidays,
        eateryImages,
    } = eateryCardProps;
    return (
        <div
            className="p-1"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
        >
            <Card className="flex">
                <div className="basis-2/5">
                    <img className="rounded-lg h-full object-cover" src={eateryImages[0]} alt={eateryName} />
                </div>
                <div className="basis-3/5">
                    <CardHeader>
                        <CardTitle className="text-3xl">{eateryName}</CardTitle>
                        <p>{eateryCategory}</p>
                    </CardHeader>
                    <CardContent>
                    <CardDescription className="line-clamp-2">{eateryDescription}</CardDescription>
                        <p>Business Hours</p>
                        <p>{`${eateryBusinessStartHour} ~ ${eateryBusinessEndHour}`}</p>
                        <p>Regular Holidays</p>
                        {
                            eateryRegularHolidays.map((holiday) => (
                                <p key={holiday}>{holiday}</p>
                            ))
                        }
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}

export default EateryCard;
