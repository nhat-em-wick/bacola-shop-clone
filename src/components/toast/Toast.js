import { ToastContainer, toast } from "react-toastify";

export const notifyError = (msg) => {
  toast.error(msg, { position: toast.POSITION.TOP_RIGHT });
};

export const notifySuccess = (msg) => {
  toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
};