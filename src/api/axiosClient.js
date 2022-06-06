import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";
import jwt_decode from "jwt-decode";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,

  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify(
      {
        ...params,
      },
      { arrayFormat: "index" }
    ),
});

const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

let refresh = false;
const refreshTokenRequest = async (refreshToken) => {
  const url = `${apiConfig.baseUrl}auth/refresh?token=${refreshToken}`;
  const response = await axios.get(url);
  return response.data;
};

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const { response } = error;
    if(refresh === true) {
      refresh = false;
    }
    if (response.status === 403 && !refresh) {
      refresh = true;
      const refreshTokenLocal = localStorage.getItem("refreshToken")
      try {
        const { accessToken, refreshToken } = await refreshTokenRequest(
          refreshTokenLocal
        );
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        response.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosClient(response.config);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
    refresh = false;
    
    return Promise.reject(error);
  }
);

export default axiosClient;
