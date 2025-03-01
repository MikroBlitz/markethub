// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    colorMode: {
        classPrefix: "",
        classSuffix: "-mode",
        componentName: "ColorScheme",
        fallback: "light",
        globalName: "__NUXT_COLOR_MODE__",
        hid: "nuxt-color-mode-script",
        preference: "system",
        storage: "localStorage",
        storageKey: "nuxt-color-mode",
    },
    compatibilityDate: "2024-11-01",
    css: ["~/assets/css/main.css"],
    devtools: { enabled: true },
    imports: { dirs: ["~/stores", "~/utils", "~/composables/*/*.{ts,js}"] },
    modules: [
        "@nuxtjs/color-mode",
        "@nuxt/eslint",
        "@nuxt/ui",
        "@nuxtjs/tailwindcss",
    ],
    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },
    srcDir: "client/",
});