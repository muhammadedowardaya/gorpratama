import React, { useEffect, useRef, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

// import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

import badmintonStadium from "../../../public/storage/images/badminton-stadium.png";
import mapPin from "../../../public/storage/images/location2.png";
import player from "../../../public/storage/images/player.png";
import RoutingMachine from "@/Components/RoutingMachine";

const markerIcon = new L.Icon({
    iconUrl: player,
    iconSize: 80,
});

const icon = new L.Icon({
    iconUrl: mapPin,
    iconSize: 80,
});

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            // const radius = e.accuracy;
            // const circle = L.circle(e.latlng, radius);
            // circle.addTo(map);
            // setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>
                You are here. <br />
                Map bbox: <br />
                <b>Southwest lng</b>: {bbox[0]} <br />
                <b>Southwest lat</b>: {bbox[1]} <br />
                <b>Northeast lng</b>: {bbox[2]} <br />
                <b>Northeast lat</b>: {bbox[3]}
            </Popup>
        </Marker>
    );
}

export default function Peta() {
    return (
        <div>
            <MapContainer
                center={[-6.621263380957707, 106.7116455580514]}
                zoom={14}
                scrollWheelZoom={true}
                className="h-screen"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={[-6.62139938095771, 106.711799999999]}
                    icon={markerIcon}
                >
                    <Popup>
                        NAON SIH MANEH! <br /> IYEU TEH CARITANA GOR PRATAMA
                        WKWK
                    </Popup>
                </Marker>

                <ReactLeafletGoogleLayer
                    // apiKey="YOUR_API_KEY"
                    type={"hybrid"}
                />

                {/* <LocationMarker /> */}
                <RoutingMachine />
                {/* <LocateControl options={locateOptions} startDirectly={true} /> */}
            </MapContainer>
        </div>
    );
}
