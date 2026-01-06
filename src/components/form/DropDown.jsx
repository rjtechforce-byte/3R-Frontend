import React from "react";

function DropDown({value, onChange, errors, touched, children, label, useFor, name, inputClass, labelClass}) {
return(<div className='flex flex-col items-start gap-2  w-full relative'>
<select name={name} value={value} onChange={onChange} className={`peer p-4 pe-9 block w-full rounded-lg text-sm font-serif text-gray-700 font-bold outline-none focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none
  focus:pt-6
  focus:pb-2
  not-placeholder-shown:pt-6
  not-placeholder-shown:pb-2
  autofill:pt-6
  autofill:pb-0 ` + inputClass}>
   {children}
</select>
 <label className={`absolute 
 text-green-900
 left-4 
 font-semibold 
 -top-4-5 
 start-0 
 bg-white truncate pointer-events-none border border-transparent peer-disabled:pointer-events-none
    peer-focus:-translate-y-2
    peer-focus:text-gray-700
    peer-not-placeholder-shown:text-xs
    peer-not-placeholder-shown:-translate-y-1.5
    peer-not-placeholder-shown:text-gray-700 ` + labelClass} htmlFor={name} >{label}</label>
{useFor === 'form' && touched && errors ? (
              <div>{errors}</div>
            ) : null
         }
    </div>)
};

export default DropDown;
