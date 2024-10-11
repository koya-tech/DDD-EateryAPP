import {
    MapContainer,
    Marker,
    Popup,
} from 'react-leaflet';
import { TileLayer } from 'react-leaflet/TileLayer';
import './leaflet/leaflet.css';
import { latLng } from 'leaflet';
import {
    useRef,
    useMemo,
    useContext,
} from 'react';
// eslint-disable-next-line import/no-cycle
import { LocationContext } from '../../../ShareForm';

// https://react-leaflet.js.org/docs/example-draggable-marker/

const center = {
    lat: 35,
    lng: 139,
};

function DraggableMarker() {
    const draggable = true;
    const { position, setPosition } = useContext(LocationContext);
    const markerRef = useRef<L.Marker>(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(
                        marker.getLatLng() as { lat: number; lng: number },
                    );
                }
            },
        }),
        [setPosition],
    );

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
            <Popup minWidth={90} />
        </Marker>
    );
}

function DraggableMap() {
    const position = latLng([center.lat, center.lng]);
    const zoom = 12;
    return (
        <div className="flex justify-center">
            <MapContainer center={position} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    maxZoom={20}
                    minZoom={2}
                />
                <DraggableMarker />
            </MapContainer>
        </div>
    );
}

export default DraggableMap;
