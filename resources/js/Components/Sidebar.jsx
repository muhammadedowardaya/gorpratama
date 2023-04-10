import { router, usePage } from "@inertiajs/react";
import "../../css/sidebar.css";
import { useEffect } from "react";

export default function Sidebar({ className, items }) {
    const { requestPath } = usePage().props;

    function requestIs(path) {
        const pattern = new RegExp(path.toString(), "gi");
        const result = pattern.test(requestPath);
        if (result) {
            return "active";
        }
    }

    useEffect(() => {
        let navigation = document.querySelector(".navigation");
        let sidebarToggle = document.querySelector(".sidebar-toggle");
        sidebarToggle.addEventListener("click", () => {
            navigation.classList.toggle("active");
        });
    }, []);

    return (
        <div
            className={`navigation ${
                className ?? ""
            } z-10 hidden md:block border-l-[10px] border-sky-500 bg-sky-500 w-[40px] md:w-[80px]`}
        >
            <ul>
                {items.map((item, index) => (
                    <li key={index} className={`${requestIs(item.path)}`}>
                        <a onClick={item.onClick}>
                            <span className="icon">{item.icon}</span>
                            <span className="title">{item.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <div className="sidebar-toggle"></div>
        </div>
    );
}
