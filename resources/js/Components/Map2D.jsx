import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import Locate from "@arcgis/core/widgets/Locate";
import Search from "@arcgis/core/widgets/Search";

export default function Map2D() {
    esriConfig.apiKey =
        "AAPKbe72a819bb4e415cb6086d15e212abfdIyjp3wrMn6STg0lpVCT-TAie_p6XB0r_lXtaM456S2IU3C3wbPewepBjOe-QLecP";
    const map = new Map({
        basemap: "arcgis-topographic", // Basemap layer service
    });

    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv", // Div element
    });

    const search = new Search({
        //Add Search widget
        view: view,
    });

    view.ui.add(search, "top-right"); //Add to the map

    const locate = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: function (view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        },
    });
    view.ui.add(locate, "top-left");

    return <div id="viewDiv"></div>;
}
