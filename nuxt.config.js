import path from 'path'
import fs from 'fs'
import { config } from 'dotenv'

const setEnvsFromDotEnvs = (env) => {
  const envPath = path.resolve(process.cwd(), `.env.${env}`)

  if (fs.existsSync(envPath)) {
    config({ path: envPath })
  }
  else {
    config()
  }
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
    },
    geo: {
      url: process.env.API_GEOJSON_URL,
      token: process.env.API_GEOJSON_TOKEN
    },
    arquivo: {
      url: process.env.API_ARQUIVOS_URL,
      token: process.env.API_ARQUIVOS_TOKEN
    },
    mode: process.env.NODE_ENV
  },
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
      { rel: 'icon', type: 'image/x-icon', href: process.env.NODE_ENV === 'dev' ? '/outorga-moderacao/favicon.ico' : 'favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '@/assets/main.scss',
    '@/assets/formCadastro.scss'
  ],
  plugins: [
    '~/plugins/vee-validate',
    '~/plugins/axios',
    { src: '~/plugins/vuelayers.js', ssr: false },
    { src: '~/plugins/v-scroll-lock', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ]
  }
}
