import axiosClient from './axiosClient'

export const category = {
  baby: 'baby',
  computers: 'computers',
  jewelery: 'jewelery',
  games: 'games',
  automotive: 'automotive',
  shoes: "shoes"
}

const shopApi = {
  getProductList: (params) => {
    const url = 'products/'
    return axiosClient.get(url, {params})
  },
  getProduct: (id) => {
    const url = `products/${id}`
    return axiosClient.get(url)
  }
}

export default shopApi