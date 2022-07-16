import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = import.meta.env.BASE_URL

export async function get(url: string, config?: AxiosRequestConfig) {
  return axios.get(url, config)
}