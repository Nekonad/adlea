// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  pages: false,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Adlea Minimal",
      meta: [{ name: "description", content: "My amazing site." }],
      //  link  //
      link: [
        //  link Animate  //
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
        //  link Bootstrap  //
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
        },
        //  link Bootstrap Icon  //
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css",
        },
        //  link Google Font Montserrat //
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
      //  separator SCRIPT //
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js",
          // body: true,
        },
        {
          src: "https://code.jquery.com/jquery-3.7.1.min.js",
          // body: true
        },
      ],
    },
  },
  //  separator CSS //
  css: ["~/assets/css/main.css", "~/assets/css/_fonts.css"],
  modules: ["nuxt-swiper"],
});
