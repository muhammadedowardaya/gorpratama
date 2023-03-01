import { useEffect, useState } from "react";
import "../../css/loading.css";

export default function Loading({ strokeColor = "#04fc43", display }) {
    const [displayContainer, setDisplayContainer] = useState("hidden");
    const [displayCircle, setDisplayCircle] = useState("");

    useEffect(() => {
        if (display === true) {
            setDisplayContainer("fixed");
            setDisplayCircle("");
        } else {
            setDisplayContainer("hidden");
            setDisplayCircle("hidden");
        }
    });

    return (
        <div
            id="container-loading"
            className={`${displayContainer} top-0 right-0 bottom-0 left-0 bg-[#2f363e] flex justify-center items-center z-40`}
        >
            <div
                id="circle"
                className={`${displayCircle} text-center cursor-progress`}
            >
                <svg className="animate-spin">
                    <circle cx={50} cy={50} r={50}></circle>
                    <circle
                        cx={50}
                        cy={50}
                        r={50}
                        style={{
                            stroke: strokeColor,
                        }}
                    ></circle>
                </svg>
                <span className="text-white animate-pulse font-bold">
                    Dagoan heula ...
                </span>
            </div>
        </div>
    );
}
