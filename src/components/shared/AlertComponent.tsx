import { IoCheckmarkDoneCircle } from "react-icons/io5";
import {Alert, AlertTitle } from "../ui/alert"
import { useModalStore } from "@/store/useModalStore";
const AlertComponent = () => {
    const alert = useModalStore(state => state.alert)
    
    return (
     
            <Alert  className="flex gap-4 fixed z-50 top-50 left-[50%] translate-x-[-50%] text-green-300 w-fit p-2 rounded-2xl">
                <IoCheckmarkDoneCircle/>
                <AlertTitle>{alert}</AlertTitle>
            
            </Alert>
   
    )
}

export default AlertComponent