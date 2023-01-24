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
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Circle from "@arcgis/core/geometry/Circle";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";

import mapImage from "../../../public/storage/images/map.jpg";
import locationSymbol from "../../../public/storage/images/location1.png";
import playerSymbol from "../../../public/storage/images/player.png";

export default function Map3D() {
    esriConfig.apiKey =
        "AAPKbe72a819bb4e415cb6086d15e212abfdIyjp3wrMn6STg0lpVCT-TAie_p6XB0r_lXtaM456S2IU3C3wbPewepBjOe-QLecP";

    const map = new Map({
        basemap: "satellite", // Basemap layer service
        ground: "world-topobathymetry", //Elevation service
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: { 
            position: {
                x: 106.71149117311289, //Longitude
                y: -6.6231738043732555, //Latitude
                z: 500, //Meters
            },
            tilt: 50,
        },
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

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // buat point penanda
    const point = {
        //Create a point
        type: "point",
        longitude: 106.71167528590135,
        latitude: -6.621458052536947,
    };

    const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40], // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1,
        },
    };

    const popupTemplatePoint = {
        title: "{Name}",
        content: "{Description}",
    };
    const attributesPoint = {
        Name: "Graphic",
        Description: "I am a polygon",
    };

    let symbol = {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        url: playerSymbol,
        width: "64px",
        height: "64px",
    };

    // let symbol3d = {
    //     type: "mesh-3d", // autocasts as new PointSymbol3D()
    //     symbolLayers: [
    //         {
    //             type: "object", // autocasts as new ObjectSymbol3DLayer()
    //             resource: {
    //                 href: badmintonCourtModel,
    //             },
    //             height: 3,
    //             material: {
    //                 color: "red",
    //             },
    //         },
    //     ],
    // };

    const pointGraphic = new Graphic({
        geometry: point,
        symbol: symbol,
        attributes: attributesPoint,
        popupTemplate: popupTemplatePoint,
    });
    graphicsLayer.add(pointGraphic);

    // buat lingkaran penanda area
    const circleGeometry = new Circle({
        center: [106.71167528590135, -6.621458052536947],
        geodesic: true,
        numberOfPoints: 100,
        radius: 20,
        radiusUnit: "meters",
    });

    const circleGraphic = new Graphic({
        geometry: circleGeometry,
        symbol: {
            type: "simple-fill",
            style: "none",
            outline: {
                width: 3,
                color: [130, 170, 227],
            },
        },
    });
    graphicsLayer.add(circleGraphic);

    // Create a polygon geometry
    // const polygon = {
    //     type: "polygon",
    //     rings: [
    //         [106.71171059879563, -6.621200587528213], //Longitude, latitude
    //         [106.71193002443238, -6.621469634441021], //Longitude, latitude
    //         [106.71165231386085, -6.621689299216783], //Longitude, latitude
    //         [106.71139860296834, -6.621421955251969], //Longitude, latitude
    //     ],
    // };

    const simpleFillSymbol = {
        type: "simple-fill",
        color: [255, 255, 255, 0.1], // Orange, opacity 80%
        outline: {
            color: [255, 255, 255, 0.5],
            width: 1,
        },
    };

    const popupTemplate = {
        title: "{Name}",
        content: "{Description}",
    };
    const attributes = {
        Name: "Graphic",
        Description: "I am a polygon",
    };

    // let polygon3d = {
    //     type: "polygon-3d", // autocasts as new PolygonSymbol3D()
    //     symbolLayers: [
    //         {
    //             type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
    //             size: 10, // Height of the extrusion in meters
    //             material: { color: [255, 255, 255, 0.3] },
    //         },
    //     ],
    // };

    const polygonGraphic = new Graphic({
        geometry: circleGeometry,
        symbol: simpleFillSymbol,
        attributes: attributes,
        popupTemplate: popupTemplate,
    });

    graphicsLayer.add(polygonGraphic);

    return <div id="viewDiv" className="row-span-5"></div>;
}
