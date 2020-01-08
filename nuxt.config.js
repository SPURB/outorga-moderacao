import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

const setEnvsFromDotEnvs = (env) => {
  const envPath = path.resolve(process.cwd(), `.env.${env}`)
  const defaultEnvPath = path.resolve(process.cwd(), '.env')

  dotenv.config({
    path: fs.existsSync(envPath) ? envPath : defaultEnvPath
  })
}

setEnvsFromDotEnvs(process.env.NODE_ENV)

export default {
  router: {
    base: '/outorga-moderacao/'
  },
  env: {
    apiBaseUrl: process.env.API_BASE_URL,
    user: {
      id: process.env.API_USER_ID,
      info: process.env.API_USER_INFO
    }
  },
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
    '@/assets/main.scss',
    '@/assets/formCadastro.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vee-validate',
    '~/plugins/axios',
    { src: '~/plugins/v-scroll-lock', mode: 'client' }
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
    transpile: [
      'vee-validate/dist/rules'
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
