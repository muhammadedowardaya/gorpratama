import { router, usePage } from "@inertiajs/react";
import "../../css/sidebar.css";
import { useEffect, useState } from "react";

export default function Sidebar({ className, items }) {
    const { requestPath } = usePage().props;
    const [unreadMessages, setUnreadMessages] = useState([]);

    function requestIs(path) {
        const currentPath = window.location.pathname;
        const pattern = new RegExp("^" + path + "$", "gi");
        return pattern.test(currentPath) ? "active" : "";
    }

    const fetchUnreadMessages = async () => {
        try {
            const response = await axios.get("/api/chat/unread-conversations");
            setUnreadMessages(response.data);
        } catch (error) {
            console.log(error);
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
        console.info(unreadMessages);
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
