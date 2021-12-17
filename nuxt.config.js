export default {
  head: {
    title: 'Funky Pickle',
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
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel:'stylesheet', href:'https://unpkg.com/swiper/swiper-bundle.min.css'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com',crossorigin:true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@365;400&family=Saira:wdth,wght@50,900;63.1,100&display=swap' }
    ],
    script:[
      {src:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/gsap.min.js'},
      {src:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/ScrollTrigger.min.js'},
      {src:'https://unpkg.com/swiper/swiper-bundle.min.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/init.js',ssr: false},
    {src: '@/plugins/scrollBuddy.js',ssr: false},
    {src: '@/plugins/directives.js',ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/prismic'
  ],
  prismic: {
    endpoint: 'https://funkypickle.prismic.io/api/v2',
    modern: true,
    preview: false,
    apiOptions: {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['assets/_variables.scss']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
