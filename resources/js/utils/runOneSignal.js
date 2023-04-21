import OneSignal from "react-onesignal";

export default async function runOneSignal() {
    await OneSignal.init({
        appId: "d2417351-77cd-45e6-b861-5447f4b68b92",
        allowLocalhostAsSecureOrigin: true,
    });
    OneSignal.showSlidedownPrompt();
    OneSignal.on("notificationDisplay", (event) => {
        console.log("OneSignal notification displayed:", event);
    });
}
