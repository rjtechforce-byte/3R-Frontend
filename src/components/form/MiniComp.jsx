import React, { useEffect } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { Icon } from "@iconify/react";


export function AlertPopup({message, type, from, setAlert}) {

        useEffect(() => {
            if(message || type || from) {
          const timer = setTimeout(() => {
                setAlert(null);
            }, 4000);
            console.log('show alert called inside useEffect', timer)
            return () => {clearTimeout(timer)};
        }
          },[message, type, from]);
    
    if(!message || !type || !from) {
        return;
    }

    return(
        <div className={type == 'error' && `bg-gray-popup
         border-3
        border-red-popup 
        absolute 
        top-[4%] 
        left-[50%] 
        animate-popup 
        transform-[translateX(-50%)] 
        w-[323px] 
        h-[71px] 
        z-10 
        flex 
        items-center  
        pl-2 
        rounded-md 
        gap-6 
        shadow-xl 
        animate-popup invisible` 
        ||
        from == 'signIn'  && 
        `bg-gray-popup
         border-3
        border-green-popup 
        absolute 
        top-[4%] 
        left-[50%] 
        animate-popup 
        transform-[translateX(-50%)] 
        w-[323px] 
        h-[71px] 
        z-10 
        flex 
        items-start 
        pt-2 
        pl-2 
        rounded-md 
        gap-3 
        shadow-xl 
        animate-popup invisible`
        ||
        
        `bg-gray-popup
         border-3
        border-green-popup 
        absolute 
        top-[4%] 
        left-[50%] 
        animate-popup 
        transform-[translateX(-50%)] 
        w-[323px] 
        h-[71px] 
        z-10 
        flex 
        items-center 
        pl-2 
        rounded-md 
        gap-6 
        shadow-xl 
        animate-popup invisible` 
        }>
        {type === "error" ? <MdErrorOutline className=" text-[34.5px] text-red-popup" /> : <FaCheckSquare className=" text-[34.5px] text-green-popup"/>}
        <div className="self-center flex items-center flex-col">
        <h2 className={type == 'error' ? "font-semibold text-[20px] text-red-500" : "font-semibold text-[20px]"}>{from === "signIn" && "Successfully Signned" || message}</h2>
        <span className="text-[14px]">{from === "signIn" && "Now You Can Login"}</span>
        </div>
        </div>
    )
}



export function Loading() {
    return(
        <div className="flex justify-center items-center w-screen h-screen">
            <Icon icon="line-md:loading-loop" width="60px" height="60px"  style={{color: 'green'}} />
        </div>
    )
}