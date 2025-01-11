import EateryCardProps from './type';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../shadcn/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../../../../shadcn/ui/alert-dialog';
import { Button } from '../../../../shadcn/ui/button';

function EateryCard({ onClick, onDelete, ...eateryCardProps }: EateryCardProps) {
    const {
        eateryId,
        eateryName,
        eateryCategory,
        eateryDescription,
        // eateryLocation,
        eateryBusinessStartHour,
        eateryBusinessEndHour,
        eateryRegularHolidays,
        eateryImages,
    } = eateryCardProps;

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/eatery/${eateryId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete eatery');
            }
            if (onDelete) {
                onDelete(eateryId);
            }
        } catch (error) {
            console.error('Error deleting eatery:', error);
        }
    };

    return (
        <Card className="flex">
            <div className="basis-2/5">
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
                    <img className="rounded-lg h-full object-cover" src={eateryImages[0]} alt={eateryName} />
                </div>
            </div>
            <div className="basis-3/5">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl">{eateryName}</CardTitle>
                            <p>{eateryCategory}</p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon">
                                    <img src="/icons/black-pin.svg" alt="Delete" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Eatery?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You cannot undo this action.
                                        Are you sure you want to delete
                                        <br />
                                        {eateryName}
                                        <br />
                                        ?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                                    <AlertDialogAction onClick={handleDelete}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription className="line-clamp-2">{eateryDescription}</CardDescription>
                    <p>営業時間</p>
                    <p>{`${eateryBusinessStartHour} ~ ${eateryBusinessEndHour}`}</p>
                    <p>定休日</p>
                    {eateryRegularHolidays.map((holiday) => (
                        <p key={holiday}>{holiday}</p>
                    ))}
                </CardContent>
            </div>
        </Card>
    );
}

export default EateryCard;
