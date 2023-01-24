import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import Locate from "@arcgis/core/widgets/Locate";
import Track from "@arcgis/core/widgets/Track";
import Graphic from "@arcgis/core/Graphic";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import * as route from "@arcgis/core/rest/route";
import Search from "@arcgis/core/widgets/Search";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";

import mapImage from "../../../public/storage/images/map.jpg";

export default function Map2D() {
    esriConfig.apiKey =
        "AAPKbe72a819bb4e415cb6086d15e212abfdIyjp3wrMn6STg0lpVCT-TAie_p6XB0r_lXtaM456S2IU3C3wbPewepBjOe-QLecP";

    const map = new Map({
        basemap: "satellite", // Basemap layer service
        ground: "world-topobathymetry", //Elevation service
    });

    // const view = new SceneView({
    //     container: "viewDiv",
    //     map: map,
    //     camera: {
    //         position: {
    //             x: -118.808, //Longitude
    //             y: 33.961, //Latitude
    //             z: 2000, //Meters
    //         },
    //         tilt: 75,
    //     },
    // });

    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv", // Div element
    });

    // awal rute
    // const routeUrl =
    //     "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?directionsLanguage=id";

    // view.on("click", function (event) {
    //     if (view.graphics.length === 0) {
    //         addGraphic("origin", event.mapPoint);
    //     } else if (view.graphics.length === 1) {
    //         addGraphic("destination", event.mapPoint);
    //         getRoute(); // Call the route service
    //     } else {
    //         view.graphics.removeAll();
    //         addGraphic("origin", event.mapPoint);
    //     }
    // });

    // function addGraphic(type, point) {
    //     const graphic = new Graphic({
    //         symbol: {
    //             type: "simple-marker",
    //             color: type === "origin" ? "white" : "black",
    //             size: "8px",
    //         },
    //         geometry: point,
    //     });
    //     view.graphics.add(graphic);
    // }

    // function getRoute() {
    //     const routeParams = new RouteParameters({
    //         stops: new FeatureSet({
    //             features: view.graphics.toArray(),
    //         }),
    //         returnDirections: true,
    //     });
    //     route
    //         .solve(routeUrl, routeParams)
    //         .then(function (data) {
    //             data.routeResults.forEach(function (result) {
    //                 result.route.symbol = {
    //                     type: "simple-line",
    //                     color: [5, 150, 255],
    //                     width: 3,
    //                 };
    //                 view.graphics.add(result.route);
    //             });
    //             // Display directions
    //             if (data.routeResults.length > 0) {
    //                 const directions = document.createElement("ol");
    //                 directions.classList =
    //                     "esri-widget esri-widget--panel esri-directions__scroller";
    //                 directions.style.marginTop = "0";
    //                 directions.style.padding = "15px 15px 15px 30px";
    //                 const features = data.routeResults[0].directions.features;
    //                 // Show each direction
    //                 features.forEach(function (result, i) {
    //                     const direction = document.createElement("li");
    //                     direction.innerHTML =
    //                         result.attributes.text +
    //                         " (" +
    //                         result.attributes.length.toFixed(2) +
    //                         " miles)";
    //                     directions.appendChild(direction);
    //                 });

    //                 view.ui.empty("top-right");
    //                 view.ui.add(directions, "top-right");
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    // akhir rute

    // const basemapToggle = new BasemapToggle({
    //     view: view,
    //     nextBasemap: "arcgis-imagery",
    // });

    // view.ui.add(basemapToggle, "bottom-right");

    // const basemapGallery = new BasemapGallery({
    //     view: view,
    //     source: {
    //         query: {
    //             title: '"World Basemaps for Developers" AND owner:esri',
    //         },
    //     },
    // });

    // view.ui.add(basemapGallery, "top-right"); // Add to the view

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

    // const track = new Track({
    //     view: view,
    //     graphic: new Graphic({
    //         symbol: {
    //             type: "simple-marker",
    //             size: "12px",
    //             color: "green",
    //             outline: {
    //                 color: "#efefef",
    //                 width: "1.5px",
    //             },
    //         },
    //     }),
    //     useHeadingEnabled: false,
    // });
    // view.ui.add(track, "top-left");

    return <div id="viewDiv" className="row-span-5"></div>;
}
