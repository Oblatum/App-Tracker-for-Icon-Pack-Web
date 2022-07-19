import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API


export async function get(url: string, config?: AxiosRequestConfig) {
  console.log(import.meta.env);
  
  return axios.get(url, config)
}