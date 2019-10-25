import axios from 'axios'

export default axios.create({
  baseURL: 'http://spurbsp163' // staging
//   baseURL: 'http://127.0.0.1:8080' // dev
})
