import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  pauseOnHover: true,
  draggable: true,
};

export const notifySuccess = (message) => {
  toast.success(message, { ...toastOptions, toastId: "success-toast" });
};

export const notifyError = (message) => {
  toast.error(message, { ...toastOptions, toastId: "error-toast" });
};