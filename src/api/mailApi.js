import axiosClient from "./axiosClient";

const mailApi = {
  postContact: (params) => {
    const url = 'mail/contact'
    return axiosClient.post(url, params)
  },
  forgotPass: (params) => {
    const url = 'mail/forgot'
    return axiosClient.post(url, params)
  }
}

export default mailApi