// const children = main.children;
// for (let i = 0; i < children.length; i++) {
//     children[i].classList.add("pulse-effect");
// }

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        window.document.body.style.visibility = "hidden";
        window.document.body.children[0].classList.add("fixed");
        window.document.body.children[0].classList.add("flex");
        window.document.body.children[0].classList.remove("hidden");
        window.document.body.children[0].children[0].classList.remove("hidden");
        // const main = document.querySelector("main");
        // const children = main.children;
        // for (let i = 0; i < children.length; i++) {
        //     // children[i].classList.add("pulse-effect");
        //     children[i].addEventListener("load", () => {
        //         children[i].classList.remove("pulse-effect");
        //     });
        // }
    } else {
        window.document.body.children[0].classList.remove("fixed");
        window.document.body.children[0].classList.remove("flex");
        window.document.body.children[0].classList.add("hidden");
        window.document.body.children[0].children[0].classList.add("hidden");
        window.document.body.style.visibility = "visible";
    }
    // window.document.body.querySelectorAll("img").forEach((item) => {
    //     item.addEventListener("loadstart", () => {
    //         if (item.classList.contains("animate-pulse") == false) {
    //             item.classList.add("animate-pulse");
    //         }
    //     });
    //     item.addEventListener("load", () => {
    //         console.info(item.getAttribute("src") + " load selesai");
    //         if (item.classList.contains("animate-pulse")) {
    //             item.classList.remove("animate-pulse");
    //         }
    //     });
    // });
};

// document.addEventListener("DOMContentLoaded", function () {
//     const main = document.querySelector("main");
//     const children = main.children;
//     for (let i = 0; i < children.length; i++) {
//         children[i].classList.add("pulse-effect");
//     }
// });
