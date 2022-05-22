import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

interface payloadConfig {
  q?: string
  regex?: string
}

export async function get(url: string, payload: payloadConfig) {
  const opts = {
    page: 1,
    per: 2147483647
  }
  return axios.get(url, {
    params: {
      ...opts,
      ...payload
    }
  }).then(response => {
    return response.data
  }).catch(reason => {
    console.error(reason);
  })
}