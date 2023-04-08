import { useEffect, useState } from "react";
import "../../css/myButton.css";

export default function MyButton({
    value,
    type = "button",
    button,
    padding = "8px 20px",
    onClick,
    className,
    underline = false,
}) {
    // const create = "bg-gradient-to-br from-sky-700 via-cyan-600 to-cyan-300";
    // const edit = "bg-gradient-to-br from-cyan-800 via-teal-600 to-emerald-300";
    // const trash = "bg-gradient-to-br from-red-800 via-red-600 to-red-300";
    // const update =
    //     "bg-gradient-to-br from-orange-800 via-amber-700 to-yellow-400";
    // const defaultColor =
    //     "bg-gradient-to-br from-stone-600 via-stone-500 to-stone-400";

    const create =
        "dark:bg-gradient-to-b rounded bg-gradient-to-br from-sky-700 via-cyan-600 to-cyan-300";
    const edit =
        "dark:bg-gradient-to-b rounded bg-gradient-to-br from-cyan-800 via-teal-600 to-emerald-300";
    const trash =
        "dark:bg-gradient-to-b rounded bg-gradient-to-br from-red-500 via-red-700 to-red-500";
    const update =
        "dark:bg-gradient-to-b rounded bg-gradient-to-br from-orange-800 via-amber-700 to-yellow-400";
    const defaultColor =
        "dark:bg-gradient-to-b rounded bg-gradient-to-br from-stone-600 via-stone-500 to-stone-400";

    function pickColor(value) {
        if (value == "create") {
            return create;
        } else if (value == "update") {
            return update;
        } else if (value == "delete") {
            return trash;
        } else if (value == "edit") {
            return edit;
        } else {
            return defaultColor;
        }
    }
    return (
        <button
            id="MyButton"
            style={{
                color: "#fff",
                backdropFilter: 'blur("20px")',
                padding: padding,
            }}
            onClick={onClick}
            className={`cursor-pointer ${className} ${pickColor(button)} ${
                underline ? "active" : ""
            }`}
        >
            {value}
        </button>
    );
}
