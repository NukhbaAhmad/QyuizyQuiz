import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastCompPropT } from "../../types";

const Toast: React.FC<ToastCompPropT> = ({ message }) => {
  const notify = () => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      toastId: "error1",
    });
  };
  notify();
  return null;
};

export default Toast;
