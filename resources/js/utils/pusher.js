import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export default new Echo({
    broadcaster: "pusher",
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
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
