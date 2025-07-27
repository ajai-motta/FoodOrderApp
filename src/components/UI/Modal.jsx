import { createPortal } from "react-dom";
import { useRef ,useEffect} from "react";
export default function Modal({children,open,className=''}) {
    const dialogRef=useRef()
    useEffect(()=>{
        const dialog=dialogRef.current
        if(open){
            dialog.showModal();
        }
        return ()=> dialog.close();
        
    },[open])
 return createPortal(<dialog ref={dialogRef} className={`modal ${className}`}>{children}</dialog>,document.getElementById('modal'))
}