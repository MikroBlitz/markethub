// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    apollo: {
        autoImports: true,
        clients: {
            default: { httpEndpoint: import.meta.env.API_URL + "/graphql" },
        },
    },
    colorMode: {
        classPrefix: "",
        classSuffix: "-mode",
        componentName: "ColorScheme",
        fallback: "light",
        globalName: "__NUXT_COLOR_MODE__",
        hid: "nuxt-color-mode-script",
        preference: "light",
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
        "@nuxtjs/apollo",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
    ],
    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            API_URL: import.meta.env.API_URL,
        },
    },
    srcDir: "client/",
    vite: {
        server: {
            watch: {
                ignored: ["**/vendor/**"],
            },
        },
    },
});
