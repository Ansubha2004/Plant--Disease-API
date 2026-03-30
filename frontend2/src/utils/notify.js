import { toast } from "react-toastify"

export const success = (message) => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
    })
}

export const failure =(message)=>{
    toast.error(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
    })

}