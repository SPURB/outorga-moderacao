import axios from 'axios'

axios.defaults.headers.common.Authorization = 'NTLM ' + process.env.ntlmToken

const formApi = axios.create({
  baseURL: process.env.apiBaseUrl
})

const axiosUserId = axios.create({
  baseURL: process.env.user.id
})

const axiosUserInfo = axios.create({
  baseURL: process.env.user.info
})

export { formApi, axiosUserId, axiosUserInfo }
