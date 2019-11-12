const apiBaseUrl = (env) => {
  switch (env) {
    // case 'dev': return 'http://servicos.spurbanismo.sp.gov.br' // comentar quando 163 voltar
    case 'dev': return 'http://spurbsp163/cepacs/api/'
    case 'mock': return 'http://localhost:5000/cepacs/api/'
    // case 'prod': return 'http://servicos.spurbanismo.sp.gov.br' // descomentar quando api estiver em produção
    default: return 'http://spurbsp163/cepacs/api/'
  }
}

export default {
  router: {
    base: '/dde/outorga-moderacao/'
  },
  env: {
    apiBaseUrl: apiBaseUrl(process.env.NODE_ENV)
  },
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Controle de cadastros da operações urbanas' },
      { property: 'og:title', content: 'SP Urbanismo | Cadastro OUCs' },
      { property: 'og:description', content: 'Controle de cadastros das Operações urbanas' },
      { property: 'og:site_name', content: 'Cadastro OUCs' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
