import axiosClient from './axiosClient'

const userApi = {
  getInfoUser: (id) => {
    const url = `users/${id}`
    return axiosClient.get(url)
  },
  postOrder: (params) => {
    const url = 'orders/user'
    return axiosClient.post(url, params)
  },
  getAllOrdersUser: (params) => {
    const url ='orders/user'
    return axiosClient.get(url, params)
  },
  getOrderUser: (id, params) => {
    const url = `orders/user/${id}`
    return axiosClient.get(url, params)
  },
  updateStatusOrder: (id, params) => {
    const url =`orders/user/${id}`
    return axiosClient.put(url, params)
  },
  changeInfo: (id, params) => {
    const url ='users/' + id
    return axiosClient.put(url, params)
  },
  changePassword: (params) => {
    const url = 'users/change-password'
    return axiosClient.put(url, params)
  },
  recoveryPassword: (params) => {
    const url = 'users/recovery'
    return axiosClient.post(url, params)
  }
}

export default userApi