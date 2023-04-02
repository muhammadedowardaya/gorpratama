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

function addCsrfHeader() {
    const token = getCsrfToken();
    if (token !== "") {
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
    }
}

if (document.readyState === "complete") {
    addCsrfHeader();
} else {
    window.onload = addCsrfHeader;
}
