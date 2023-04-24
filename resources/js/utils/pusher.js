import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export default new Echo({
    broadcaster: "pusher",
    key: "bda224757a06c9269de3",
    cluster: "ap1",
    forceTLS: true,
    authEndpoint: "/broadcasting/auth",
    auth: {
        headers: {
            Authorization: `Bearer ${
                document.head.querySelector('meta[name="csrf-token"]').content
            }`,
        },
    },
});
