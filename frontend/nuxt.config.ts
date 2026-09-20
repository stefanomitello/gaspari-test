import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: process.env.API_PROXY_TARGET ?? "http://localhost:8080/api",
    public: {
      apiBase: "/api",
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: process.env.API_PROXY_TARGET ?? "http://localhost:8080/api",
        changeOrigin: true,
      },
    },
  },
  app: {
    head: {
      title: "Vivi Bugliano",
      htmlAttrs: {
        lang: "it",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  alias: {
    "@admin": resolve("./layers/admin/app"),
  },
  css: [
    "bootstrap-italia/dist/css/bootstrap-italia.min.css",
    "~/assets/scss/main.scss",
    "@admin/assets/css/tailwind.css",
  ],
  vite: {
    plugins: [...tailwindcss()],
  },
  modules: ["shadcn-nuxt"],
  shadcn: {
    prefix: "Ui",
    componentDir: "./layers/admin/app/components/ui",
  },
});
