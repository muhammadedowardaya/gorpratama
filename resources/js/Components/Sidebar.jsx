import { router, usePage } from "@inertiajs/react";
import "../../css/sidebar.css";
import { useEffect, useState } from "react";

export default function Sidebar({ className, items }) {
    const { requestPath } = usePage().props;
    const [unreadMessages, setUnreadMessages] = useState([]);

    function requestIs(path) {
        const currentPath = window.location.pathname;
        const pattern = new RegExp("^" + path.replace("*", ".*") + "$", "gi");
        return pattern.test(currentPath) ? "active" : "";
    }

    const fetchUnreadMessages = async () => {
        try {
            const response = await axios.get("/api/chat/unread-conversations");
            setUnreadMessages(response.data);
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        let navigation = document.querySelector(".navigation");
        let sidebarToggle = document.querySelector(".sidebar-toggle");
        sidebarToggle.addEventListener("click", () => {
            navigation.classList.toggle("active");
        });

        // Ambil jumlah pesan yang belum dibaca dari server
        fetchUnreadMessages();
    }, []);

    return (
        <div
            className={`navigation ${
                className ?? ""
            } z-10 hidden md:block border-l-[10px] border-sky-500 dark:border-gray-700 bg-sky-500 dark:bg-gray-700 w-[40px] md:w-[80px] max-h-[85vh]`}
        >
            <ul className=" overflow-y-auto scrollbar-hide">
                {items.map((item, index) => (
                    <li key={index} className={`${requestIs(item.path)}`}>
                        <a onClick={item.onClick}>
                            {item.custom_icon && item.custom_icon}
                            {item.icon && (
                                <span className="icon">{item.icon}</span>
                            )}
                            {item.title && (
                                <span className="title">{item.title}</span>
                            )}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="sidebar-toggle z-10"></div>
        </div>
    );
}
