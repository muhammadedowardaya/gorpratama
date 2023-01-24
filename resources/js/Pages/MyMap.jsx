// import Map from "@arcgis/core/Map";
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
import Map2D from "@/Components/Map2D";
import Map3D from "@/Components/Map3D";
import Map from "@/Components/Map";
import { useState } from "react";
import MapRoute from "@/Components/MapRoute";

export default function MyMap() {
    // state untuk menentukan jeis map yang akan ditampilkan
    const [jenisMap, setJenisMap] = useState("2D");

    function showMap() {
        if (jenisMap == "2D") {
            return <Map2D />;
        } else if (jenisMap == "3D") {
            return <Map3D />;
        }
    }

    return (
        <div className="min-h-screen w-screen">
            {/* <div
                className="row-span-1"
                style={{
                    backgroundImage: `url(${mapImage})`,
                    objectFit: "cover",
                    backgroundPositionY: "-622px",
                    backgroundPositionX: "-253px",
                }}
            >
                <h1 className="text-3xl font-bold text-center m-4">PETA</h1>
                <div className="flex justify-center">
                    <button
                        className="btn bg-yellow-900 m-2"
                        onClick={(e) => {
                            e.preventDefault();
                            setJenisMap("2D");
                        }}
                    >
                        Lihat dalam 2D
                    </button>
                    <button
                        className="btn bg-yellow-900 m-2"
                        onClick={(e) => {
                            e.preventDefault();
                            setJenisMap("3D");
                        }}
                    >
                        Lihat dalam 3D
                    </button>
                    <button
                        className="btn bg-yellow-900 m-2"
                        onClick={(e) => {
                            e.preventDefault();
                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    console.info(
                                        `nih lat : ${position.coords.latitude}, lat : ${position.coords.longitude}`
                                    );
                                }
                            );
                        }}
                    >
                        Lihat Rute
                    </button>
                </div>
            </div> */}
            <Map />
        </div>
    );
}
