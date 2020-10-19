import axios from 'axios'

const formApi = axios.create({
  baseURL: process.env.apiBaseUrl
})

const axiosUserId = axios.create({
  baseURL: process.env.user.id
})

const axiosUserInfo = axios.create({
  baseURL: process.env.user.info
})

const axiosGeojson = axios.create({
  baseURL: process.env.geo.url,
  headers: {
    Authorization: process.env.geo.token
  }
})

const axiosArquivos = axios.create({
  baseURL: process.env.arquivo.url,
  headers: {
    Authorization: process.env.arquivo.token
  }
})

export { formApi, axiosUserId, axiosUserInfo, axiosGeojson, axiosArquivos }
