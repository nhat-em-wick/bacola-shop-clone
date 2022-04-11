import axiosClient from "./axiosClient";

const shopApi = {
  getProductList: (params) => {
    const url = "products";
    return axiosClient.get(url, {params} );
  },
  getProduct: (slug) => {
    const url = `products/${slug}`;
    return axiosClient.get(url);
  },
  getCategories: () => {
    const url = "categories";
    return axiosClient.get(url);
  },
  getCart: (params) => {
    const url = "cart";
    return axiosClient.get(url, {params});
  },
  tracking: (params) => {
    const url = `products/tracking`
    return axiosClient.get(url, {params});
  }
};

export default shopApi;
