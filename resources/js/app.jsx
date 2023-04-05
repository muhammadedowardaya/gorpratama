import "./bootstrap";
import "../css/app.css";

import "./FirstLoadWeb";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

const pusher = new Pusher("bda224757a06c9269de3", {
    cluster: "ap1",
    encrypted: true,
    useTLS: true,
});

window.Echo = {
    channel: function (channelName) {
        return pusher.subscribe(channelName);
    },
    listen: function (eventName, callback) {
        pusher.bind(eventName, callback);
    },
};

const chatId = document
    .querySelector('meta[name="chat-id"]')
    ?.getAttribute("content");

if (chatId) {
    window.Echo.private(`chat.${chatId}`).listen("ChatSent", (e) => {
        console.log(e.chat);
        // kode untuk menampilkan pesan chat baru pada halaman
    });
}

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#67e8f9",
    },
});
