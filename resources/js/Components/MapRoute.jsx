import React, { useEffect } from "react";
import L from "leaflet";

export default function MapRoute() {
    const apiKey =
        "AAPKbe72a819bb4e415cb6086d15e212abfdIyjp3wrMn6STg0lpVCT-TAie_p6XB0r_lXtaM456S2IU3C3wbPewepBjOe-QLecP";
    const basemapEnum = "ArcGIS:Streets";

    useEffect(() => {
        // Update the document title using the browser <API></API>
        const map = L.map("map", {
            minZoom: 2,
        });

        navigator.geolocation.getCurrentPosition((position) => {
            map.setView(
                [position.coords.longitude, position.coords.latitude],
                13
            );
        });

        L.esri.Vector.vectorBasemapLayer(basemapEnum, {
            apiKey: apiKey,
        }).addTo(map);
    });

    return <div id="map" className="row-span-5"></div>;
}
