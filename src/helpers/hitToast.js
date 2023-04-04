//Toasting is happining here

import { toast } from 'react-toastify';
const hitToast = ( message) => {
    console.log(message)
    if (['success', 'error'].includes(message))throw Error();
    toast(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export default hitToast;