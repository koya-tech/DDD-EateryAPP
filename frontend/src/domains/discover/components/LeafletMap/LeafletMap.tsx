import L, { latLng } from 'leaflet';
import { Marker } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import './leaflet/leaflet.css';

function LeafletMap({
    locationArray,
    selectedEateryId,
}: {
        locationArray: { eateryId: string, location: number[] }[],
        selectedEateryId: string | null,
}) {
    const position = latLng([35.6809591, 139.7673068]);
    console.log(selectedEateryId);
    const zoom = 12;
    const defaultIcon = L.icon({
        iconUrl: 'black-pin.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    const selectedIcon = L.icon({
        iconUrl: 'red-pin.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <div>
            <MapContainer center={position} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    maxZoom={20}
                    minZoom={2}
                />
                {locationArray.map(({ eateryId, location }) => (
                    <Marker
                        key={eateryId}
                        position={[location[1], location[0]]}
                        icon={eateryId === selectedEateryId ? selectedIcon : defaultIcon}
                    />
                ))}
            </MapContainer>
        </div>
    );
}

export default LeafletMap;
