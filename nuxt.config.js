const Prismic = require("@prismicio/client");

export default {
  target: 'static',
  components: true,
  loading: false,
  head: {
    title: 'funkypickle',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Saira+Extra+Condensed:wght@600;700&display=swap" },
      {rel:"stylesheet", href:"https://unpkg.com/swiper@8/swiper-bundle.min.css"}
    ],
    script:[
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/gsap.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/ScrollTrigger.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollToPlugin.min.js" },
      {src:"https://unpkg.com/swiper@8/swiper-bundle.min.js"},
    ]
  },
  css: ['@/assets/main.css'],
  plugins: [],
  buildModules: ['@nuxtjs/tailwindcss','@nuxtjs/prismic'],
  modules: [],
  build: {},
  prismic: {
    endpoint: process.env.PRISMIC_END_POINT,
    modern: true,
    preview: false,
    apiOptions: {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  },
  generate: {
    fallback: true
  },
  build: {
    transpile: ["vue-slicezone", "nuxt-sm"]
  }
}
