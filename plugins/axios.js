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
  baseURL: process.env.apiGeojson
})
axiosGeojson.defaults.headers.common.Authorization = process.env.apiToken

export { formApi, axiosUserId, axiosUserInfo, axiosGeojson }
