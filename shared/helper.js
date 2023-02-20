import { toast } from 'react-toastify';

const messageHelper = (type, message) => {
  toast[type](message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default messageHelper;
