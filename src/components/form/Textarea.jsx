import React, { useState, useEffect } from "react";


function Textarea({touched, errors, onChange, value, name, children, onBlur}) {
           const [outlineRing, setOutlineRing] = useState(' focus:ring-2 focus:outline-1 focus:ring-green-500 focus:outline-green-500 ')
                  
        
                  useEffect(() => {
                     if(touched && errors) {
                    setOutlineRing(' ring-2 outline-1 ring-red-500 outline-red-500 ')
                  }
                  else{
                    setOutlineRing(' focus:ring-2 focus:outline-1 focus:ring-green-500 focus:outline-green-500 ')
                  }
                  }, [value, errors, touched])


return(<>
<div className='flex flex-col items-start  w-full relative  min-w-[200px]'>
        
        <textarea name={name} placeholder=' ' value={value} onChange={onChange} onBlur={onBlur} className={"peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-gray-700 ring-green-500 bg-transparent px-3 py-2.5 text-sm font-normal text-gray-800 outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-700 placeholder-shown:border-t-gray-700 focus:border focus:border-white disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" + outlineRing}></textarea>
        <label className="
        pointer-events-none 
        absolute  
        bg-white
        left-4 
        top-5
        translate-y-3 
        flex   
        px-1
        select-none 
        text-[11px]  
        text-gray-900
        font-semibold
        transition-all 
        peer-placeholder-shown:text-sm 
        peer-placeholder-shown:top-2
        peer-placeholder-shown:translate-y-0
        peer-placeholder-shown:text-gray-900
        peer-not-placeholder-shown:-top-5
        peer-not-placeholder-shown:translate-y-0
        peer-focus:text-[11px]
        peer-focus:text-gray-900
        peer-focus:-top-2
        peer-not-focus:translate-y-3
        peer-disabled:text-transparent 
        peer-disabled:peer-placeholder-shown:text-white">{children}</label>
        </div>
        {touched && errors ? (
              <span className="text-red-500 text-[12px] self-start ml-3 -mt-5">* {errors}</span>
            ) : null}
        </>)
};

export default Textarea;