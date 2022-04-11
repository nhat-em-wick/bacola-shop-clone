import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,

  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({
      ...params,
    }, {arrayFormat: 'index'}),
});

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
    const refreshToken = localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null;
    if (accessToken) {
      let date = new Date();
      const decodeToken = jwt_decode(accessToken);
      if (decodeToken.exp < date.getTime() / 1000) {
        try {
            const res = await axios.get(`${apiConfig.baseUrl}auth/refresh?refreshToken=${refreshToken}`);
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            config.headers.token = `Bearer ${res.data.accessToken}`;
        } catch (error) {
          console.log(error)
        }
      } else {
        config.headers.token = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (e) => {
    throw e;
  }
);

export default axiosClient;
