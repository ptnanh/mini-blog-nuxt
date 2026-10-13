import { ref } from "vue";

export default defineNuxtConfig({
  compatibilityDate: "2026-10-05",
  devtools: { enabled: true },

  nitro: {
    externals: {
      inline: [/[\\/]node_modules[\\/]nuxt[\\/]dist[\\/]/],
    },
  },

  routeRules: {
    "/notes": { redirect: "/" },
  },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Sổ tay của tôi",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap",
        },
      ],
    },
  },
});
