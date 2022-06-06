import axiosClient from './axiosClient'

const adminApi = {
  dashboard: (params) => {
    const url = '/admin/dashboard'
    return axiosClient.get(url, params)
  },
  postProduct: (params) => {
    const url = '/products'
    return axiosClient.post(url, params)
  },
  putProduct: (params) => {
    const url =  `/products/${params.id}`
    return axiosClient.put(url, params)
  },
  deleteProducts: (params) => {
    const url = '/products'
    return axiosClient.delete(url, {params})
  },
  getAllUser: (params) => {
    const url = '/users'
    return axiosClient.get(url, {params})
  },
  getInfoUser: (id) => {
    const url = '/users/'+ id
    return axiosClient.get(url)
  },
  
  addUser: (params) => {
    const url = '/users'
    return axiosClient.post(url, params)
  },
  putUser: (id,params) => {
    const url = '/users/' + id
    return axiosClient.put(url, params)
  },
  deleteUsers: (params) => {
    const url = '/users'
    return axiosClient.delete(url, {params})
  },
  getAllOrder: (params) => {
    const url = '/orders/customer'
    return axiosClient.get(url, {params})
  },
  getOrder: (id,params) => {
    const url = `orders/customer/${id}`
    return axiosClient.get(url, params)
  },
  putOrder: (id, params) => {
    const url = `orders/customer/${id}`
    return axiosClient.put(url, params)
  }
}

export default adminApi