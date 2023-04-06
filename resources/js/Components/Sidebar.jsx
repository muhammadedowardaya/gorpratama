import { router, usePage } from "@inertiajs/react";
import "../../css/sidebar.css";

export default function Sidebar({ className, items }) {
    let navigation = document.querySelector(".navigation");
    const { requestPath } = usePage().props;

    function requestIs(path) {
        const pattern = new RegExp(path.toString(), "gi");
        const result = pattern.test(requestPath);
        if (result) {
            return "active";
        }
    }

    return (
        <div
            className={`navigation ${
                className ?? ""
            } z-40 border-l-[10px] border-sky-500 bg-sky-500 dark:backdrop-filter dark:backdrop-blur-md dark:bg-opacity-30 dark:border-opacity-10 dark:border-slate-700`}
        >
            <ul>
                {items.map((item, index) => (
                    <li key={index} className={`${requestIs(item.path)}`}>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                item.onClick;
                            }}
                        >
                            <span className="icon">{item.icon}</span>
                            <span className="title">{item.title}</span>
                        </a>
                    </li>
                ))}
            </ul>
            <div
                className="sidebar-toggle"
                onClick={() => {
                    navigation.classList.toggle("active");
                }}
            ></div>
        </div>
    );
}
