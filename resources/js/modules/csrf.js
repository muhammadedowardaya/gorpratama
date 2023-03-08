import axios from "axios";

function getCsrfToken() {
    const metaTags = document.getElementsByTagName("meta");
    for (let i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute("name") === "csrf-token") {
            return metaTags[i].getAttribute("content");
        }
    }
    return "";
}

axios.interceptors.request.use(function (config) {
    config.headers["X-CSRF-TOKEN"] = getCsrfToken();
    return config;
});
