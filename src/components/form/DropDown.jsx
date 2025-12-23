import React from "react";

function DropDown({value, onChange, errors, touched, children, label, useFor, name, inputClass, labelClass}) {
return(<div className='flex flex-col items-start gap-2  w-full relative'>
<select name={name} value={value} onChange={onChange} className={`peer p-4 pe-9 block w-full rounded-lg text-sm outline-none focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none
  focus:pt-6
  focus:pb-2
  not-placeholder-shown:pt-6
  not-placeholder-shown:pb-2
  autofill:pt-6
  autofill:pb-0 ` + inputClass}>
   {children}
</select>
 <label className={`absolute 
 text-white
 left-4 
 font-semibold 
 -top-4-5 
 start-0 
 bg-[#D9E4DD] truncate pointer-events-none border border-transparent peer-disabled:pointer-events-none
    peer-focus:text-xs
    peer-focus:-translate-y-1.5
    peer-focus:text-white
    peer-not-placeholder-shown:text-xs
    peer-not-placeholder-shown:-translate-y-1.5
    peer-not-placeholder-shown:text-white ` + labelClass} htmlFor={name} >{label}</label>
{useFor === 'form' && touched && errors ? (
              <div>{errors}</div>
            ) : null
         }
    </div>)
};

export default DropDown;