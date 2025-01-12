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
        <Card className="flex h-[28rem] overflow-hidden">
        <div className="basis-2/5 bg-gray-100">
            <div
            className="h-full w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                onClick();
                }
            }}
            >
            <img
                className="h-full w-full object-cover"
                src={eateryImages[0]}
                alt={eateryName}
            />
            </div>
        </div>

        <div className="basis-3/5 flex flex-col overflow-hidden">
            <CardHeader className="flex-none pb-4">
            <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                <CardTitle className="text-2xl font-bold text-gray-900 truncate">
                    {eateryName}
                </CardTitle>
                <p className="text-sm text-gray-600">{eateryCategory}</p>
                </div>
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="flex-none">
                    <img src="/trush.svg" alt="Delete" className="w-5 h-5" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-semibold">
                        Delete Eatery?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center space-y-2">
                        <p>You cannot undo this action.</p>
                        <p>Are you sure you want to delete</p>
                        <p className="font-medium">{eateryName}</p>
                        <p>?</p>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-2">
                        <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                        <AlertDialogAction onClick={handleDelete}>
                        Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-4 overflow-y-auto">
            <CardDescription className="line-clamp-2 text-sm text-gray-600">
                {eateryDescription}
            </CardDescription>
            <div className="space-y-4">
                <div>
                <h3 className="font-medium text-gray-900 mb-1">営業時間</h3>
                <p className="text-sm text-gray-600">
                    {`${eateryBusinessStartHour} ~ ${eateryBusinessEndHour}`}
                </p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-900 mb-1">定休日</h3>
                    <div className="space-y-1">
                        {eateryRegularHolidays.map((holiday) => (
                        <p key={holiday} className="text-sm text-gray-600">{holiday}</p>
                        ))}
                    </div>
                </div>
            </div>
            </CardContent>
        </div>
        </Card>
    );
}

export default EateryCard;
