const Prismic = require('@prismicio/client')

export default {
  target: "static",
  components: true,
  ssr: true,
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@365;400&family=Saira+Extra+Condensed:wght@700&display=swap' }
    ],
    script:[
      {src:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/gsap.min.js'},
      {src:'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/ScrollTrigger.min.js'},
      {src:'https://unpkg.com/swiper/swiper-bundle.min.js'}
    ]
  },
  generate:{
    fallback: "404.html",
    interval: 500,
    concurrency: 100,
    async routes(){
      let generatedRoutes = []
      const client = Prismic.client(process.env.PRISMIC_END_POINT, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
      })
      const pages = await client.query(Prismic.Predicates.at('document.type', 'page'))
      pages.results.forEach(page => {
        generatedRoutes.push(
          {
            route: `/${page.uid == 'home' ? '' : page.uid}`,
            payload: page
          }
        )
      })
      return generatedRoutes
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['assets/scss/_variables.scss','assets/scss/_mixins.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/init.js',ssr: false},
    {src: '@/plugins/scrollBuddy.js',ssr: false},
    {src: '@/plugins/directives.js',ssr: false}
  ],
  loading: false,
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/prismic'
  ],
  prismic: {
    endpoint: process.env.PRISMIC_END_POINT,
    modern: true,
    preview: false,
    apiOptions: {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      }
    }
  }
}
