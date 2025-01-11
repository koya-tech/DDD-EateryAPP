import { useEffect, useState } from 'react';
// import eatrySample from '../../sampleData';
import EateryCard from '../components/EateryCard/EateryCard';
import LeafletMap from '../components/LeafletMap/LeafletMap';
import EateryType from './type';

function Discover() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [eateriesData, setEateriesData] = useState<EateryType[]>([]);
    const [
        locationArray,
        setLocationArray,
    ] = useState<{ eateryId: string, location: number[] }[]>([]);
    const [selectedEateryId, setSelectedEateryId] = useState<string | null>(null);

    const handleDelete = (deletedId: string) => {
        setEateriesData(eateriesData.filter((eatery) => eatery.eateryId !== deletedId));
    };

    useEffect(() => {
        const fetchEateryData = async (): Promise<void> => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/eatery', {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }
                const data: EateryType[] = await response.json() as EateryType[];
                setEateriesData(data);

                const locations = data.map((eatery: EateryType) => ({
                    eateryId: eatery.eateryId,
                    location: eatery.eateryLocation, // [latitude, longitude]
                }));
                setLocationArray(locations);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'Unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchEateryData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex">
            <div className="basis-1/2 h-screen overflow-y-scroll">
                {eateriesData.map((data) => (
                    <EateryCard
                        key={data.eateryId}
                        eateryId={data.eateryId}
                        eateryName={data.eateryName}
                        eateryDescription={data.eateryDescription}
                        eateryCategory={data.eateryCategory}
                        eateryBusinessStartHour={data.eateryBusinessHours[0]}
                        eateryBusinessEndHour={data.eateryBusinessHours[1]}
                        eateryImages={data.eateryImages}
                        eateryLocation={data.eateryLocation}
                        eateryRegularHolidays={data.eateryRegularHolidays}
                        onClick={() => setSelectedEateryId(data.eateryId)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <div className="basis-1/2 z-40">
                <LeafletMap locationArray={locationArray} selectedEateryId={selectedEateryId} />
            </div>
        </div>
    );
}

export default Discover;
