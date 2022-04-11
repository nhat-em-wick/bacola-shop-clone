import axios from "axios";

const uploadFiles = async (files) => {
  
  const uploaders = files.map(file => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.REACT_APP_NAME_UPLOAD_IMG)
    return axios.post("https://api.cloudinary.com/v1_1/coder-nhatpro/upload", formData).then(res => {
      return res.data.url
    })
  })

  const res = await axios.all(uploaders)
  
  return res
}

export default uploadFiles