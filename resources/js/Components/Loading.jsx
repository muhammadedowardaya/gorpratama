import { useEffect, useState } from "react";
import "../../css/loading.css";

export default function Loading({ strokeColor = "#04fc43", display }) {
    const [displayContainer, setDisplayContainer] = useState("hidden");
    const [displayCircle, setDisplayCircle] = useState("");

    const orbes = document.querySelectorAll(".loader .orbe");
    orbes.forEach((item, index) => {
        item.style.setProperty("--index", index - 1);
    });

    useEffect(() => {
        if (display === true) {
            setDisplayContainer("flex");
            setDisplayCircle("");
        } else {
            setDisplayContainer("hidden");
            setDisplayCircle("hidden");
        }
    });

    return (
        <div className={`container-loader ${displayContainer} `}>
            <div className={`loader ${displayContainer}`}>
                <div className="orbe"></div>
                <div className="orbe"></div>
                <div className="orbe"></div>
                <div className="orbe"></div>
                <div className="orbe"></div>
            </div>
        </div>
    );
}
