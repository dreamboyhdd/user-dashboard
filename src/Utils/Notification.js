import 'react-toastify/dist/ReactToastify.css';
import { toast, Zoom } from 'react-toastify';


export const Alertwarning = (title) => {
  toast.warning(title, {
    theme: 'light',
    autoClose: 2500,
    position: toast.POSITION.BOTTOM_RIGHT,
    transition: Zoom
  });
};

export const Alertsuccess = (title) => {
  toast.success(title, {
    theme: 'colored',
    autoClose: 2500,
    position: toast.POSITION.BOTTOM_RIGHT,
    transition: Zoom
  });
};


export const Alertinfo = (title) => {
  toast.info(title, {
    theme: 'colored',
    autoClose: 2500,
    position: toast.POSITION.BOTTOM_RIGHT,
    transition: Zoom
  });
};

export const Alerterror = (title) => {
  toast.error(title, {
    theme: 'colored',
    autoClose: 2500,
    position: toast.POSITION.BOTTOM_RIGHT,
    transition: Zoom
  });
} 