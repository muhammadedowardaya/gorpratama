// const children = main.children;
// for (let i = 0; i < children.length; i++) {
//     children[i].classList.add("pulse-effect");
// }

// document.onreadystatechange = function () {
//     if (document.readyState !== "complete") {
//         window.document.documentElement.children[1].style.visibility = "hidden";
//         window.document.documentElement.children[2].classList.remove("!hidden");
//         window.document.documentElement.children[2].firstChild.classList.remove(
//             "hidden"
//         );
//     } else {
//         window.document.documentElement.children[2].classList.add("!hidden");
//         window.document.documentElement.children[2].firstChild.classList.remove(
//             "hidden"
//         );
//         window.document.documentElement.children[1].style.visibility =
//             "visible";
//     }
// };
// document.addEventListener("DOMContentLoaded", function (event) {
// const loader = window.document.getElementById("loader");
// const pyramidLoader = window.document
//     .getElementById("loader")
//     .querySelector(".pyramid-loader");
// const body = window.document.body;
// const app = window.document.getElementById("app");
// const firstChildApp = window.document.getElementById("main");
// body.onload = () => {
//     console.info(firstChildApp);
// };
// firstChildApp.addEventListener("load", () => {
//     // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
//     if (!loader.classList.contains("!hidden")) {
//         // loader.classList.add("!hidden");
//         window.document.getElementById("loader").classList.add("!hidden");
//         // pyramidLoader.classList.add("hidden");
//         window.document
//             .getElementById("loader")
//             .querySelector(".pyramid-loader")
//             .classList.add("hidden");
//         console.info("tidak ada class !hidden");
//     }
//     console.info("firstChild telah di load");
// });
// if (loader.classList.contains("!hidden")) {
//     loader.classList.remove("!hidden");
//     loader.querySelector(".pyramid-loader").classList.remove("hidden");
// }
// if (body) {
//     body.addEventListener("load", () => {
//         if (app) {
//             app.addEventListener("load", () => {
//                 firstChildApp.addEventListener("load", () => {
//                     // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
//                     if (!loader.classList.contains("!hidden")) {
//                         // loader.classList.add("!hidden");
//                         window.document
//                             .getElementById("loader")
//                             .classList.add("!hidden");
//                         // pyramidLoader.classList.add("hidden");
//                         window.document
//                             .getElementById("loader")
//                             .querySelector(".pyramid-loader")
//                             .classList.add("hidden");
//                         console.info("tidak ada class !hidden");
//                     }
//                     console.info("firstChild telah di load");
//                 });
//             });
//         }
//     });
// }
// });
document.onreadystatechange = function () {
    const body = window.document.body;
    const firstChildApp = window.document.getElementById("main");
    const loader = window.document.getElementById("loader");
    const pyramidLoader = window.document
        .getElementById("loader")
        .querySelector(".pyramid-loader");
    // const body = window.document.body;
    const app = window.document.getElementById("app");

    if (document.readyState !== "complete") {
        if (body) {
            body.style.visibility = "hidden";
        }
    } else {
        if (app.children.length > 0) {
            // kode di sini akan dijalankan setelah semua elemen halaman telah dimuat
            if (loader) {
                loader.classList.add("!hidden");
                pyramidLoader.classList.add("hidden");
            }
            if (body) {
                body.style.visibility = "visible";
            }
        }
    }
};
