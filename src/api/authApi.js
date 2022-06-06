import axiosClient from './axiosClient'

const authApi = {
  login: (params) => {
    const url = 'auth/login'
    return axiosClient.post(url, params)
  },
  
  register: (params) => {
    const url = 'auth/register'
    return axiosClient.post(url, params)
  },
  refresh: (params) => {
    const url = 'auth/refresh'
    return axiosClient.get(url, params)
  }
}

export default authApi