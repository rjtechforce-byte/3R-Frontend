import React from "react";
import { Link } from "react-router-dom";
import { FaCheckSquare, FaChevronLeft } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { ImSpinner10 } from "react-icons/im";
import { Icon } from "@iconify/react";
import { FaBackward } from "react-icons/fa";

export function AlertPopup({message, type, from}) {
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



export function Loading({ message = "Loading...", fullScreen = true }) {
    return (
        <div className={`flex justify-center items-center ${fullScreen ? 'w-screen h-screen' : 'w-full h-full'} relative overflow-hidden`}>
            <div className="mt-[10vh] flex flex-col items-center">
                <div className="relative">
                    <div className="text-6xl text-emerald-600 font-bold my-7">
                        <ImSpinner10 className="animate-spin" />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-400/20 to-green-400/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {message}
                </h3>
            </div>
        </div>
    )
}


export function LoadingInline({ message = "Loading..." }) {
    return (
        <div className="flex justify-center items-center p-4">
            <div className="flex flex-col items-center">
                <div className="relative">
                    <ImSpinner10 className="text-3xl text-emerald-600 animate-spin" />
                </div>
                <h4 className="text-sm font-semibold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mt-2">
                    {message}
                </h4>
            </div>
        </div>
    )
}


export function BackButton({ to, className = "", children = "Back" }) {
    const handleClick = () => {
        
        window.scroll({
            top: 0,
            behavior: 'instant'
        });
    };

    return (
        <Link
            to={to}
            onClick={handleClick}
            className={`
                group relative inline-flex items-center gap-3 px-10 py-3 
                bg-linear-to-r from-emerald-400 to-green-500 
                hover:from-emerald-300 hover:to-green-400
                text-white font-semibold rounded-xl 
                transition-all duration-300 ease-out
                transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50
                focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50
                before:absolute before:inset-0 before:rounded-xl before:bg-white/35 
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                active:scale-95 border border-emerald-400/80 hover:border-emerald-300
                ${className}
            `}
        >
            <div className="relative flex items-center gap-3">
                <div className="rounded-lg backdrop-blur-sm">
                    <FaBackward className="text-sm transition-transform duration-300 group-hover:-translate-x-1"/> 
                </div>
                <span className="tracking-wide drop-shadow-xl">{children}</span>
            </div>
            
            {/* Beautiful emerald glow effect */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-400 to-green-500 
                          rounded-xl opacity-0 group-hover:opacity-90 transition-opacity duration-300 blur-sm -z-10"></div>
        </Link>
    );
}
