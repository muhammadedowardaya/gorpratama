import { useEffect, useState } from "react";
import "../../css/switchMode.css";

export default function SwitchMode({ className }) {
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        // Mengecek Local Storage untuk mendapatkan mode saat halaman dimuat kembali
        const mode = localStorage.getItem("mode");
        if (mode === "dark") {
            setIsChecked(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsChecked(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const handleCheckboxChange = (event) => {
        // Menyimpan mode ke Local Storage saat checkbox dicentang
        if (event.target.checked) {
            localStorage.setItem("mode", "dark");
            document.documentElement.classList.add("dark");
        } else {
            localStorage.removeItem("mode");
            document.documentElement.classList.remove("dark");
        }
        setIsChecked(event.target.checked);
    };

    return (
        <label
            className={`my-switch ${className}`}
            style={{ width: "150px", height: "195px" }}
        >
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <div className="checkbox-button">
                <div className="light"></div>
                <div className="dots"></div>
                <div className="characters"></div>
                <div className="shine"></div>
                <div className="shadow"></div>
            </div>
        </label>
    );
}
