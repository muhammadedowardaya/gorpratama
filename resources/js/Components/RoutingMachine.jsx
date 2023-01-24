import L from "leaflet";
// import { createControlComponent } from "@react-leaflet/core";
// import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(-6.62139938095771, 106.711799999999),
            L.latLng(-6.369047068556044, 106.58149298369614),
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }],
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
