// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//     base: "./",
//     plugins: [react()],
//     server: {
//         port: 8080,
//     },
// });

import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react(), basicSsl()],
    build: {
        outDir: "./docs",
    },
    server: {
        port: 444,
        // host: "0.0.0.0",
        // hmr: {
        //     host: "scooter-police-miniapp-phaser.local",
        //     port: 444,
        // },
        // https: {
        //     key: fs.readFileSync("./.cert/localhost-key.pem"),
        //     cert: fs.readFileSync("./.cert/localhost.pem"),
        // },
        optimizeDeps: {
            exclude: ["i18next"],
        },
    },
});

