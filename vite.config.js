import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import envCompatible from "vite-plugin-env-compatible";

dotenv.config();

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
        envCompatible({
            PUSHER_APP_KEY: JSON.stringify(process.env.PUSHER_APP_KEY),
            PUSHER_APP_CLUSTER: JSON.stringify(process.env.PUSHER_APP_CLUSTER),
        }),
    ],
});
