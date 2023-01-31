import { useEffect, useState } from "react";
import "../../css/switchMode.css";

export default function SwitchMode({ className, size = "1em" }) {
    const [check, setCheck] = useState(false);
    const html = document.querySelector("html");

    useEffect(() => {
        if (check == true) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    });

    const handleChange = (e) => {
        setCheck(e.target.checked);
    };

    return (
        <label
            className={`swap swap-flip ${className}`}
            style={{
                fontSize: size,
            }}
        >
            {/* <!-- this hidden checkbox controls the state --> */}
            <input id="switch-mode" type="checkbox" onChange={handleChange} />
            <div className="swap-on">😈</div>
            <div className="swap-off">😇</div>
        </label>
    );
}
