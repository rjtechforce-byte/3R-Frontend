import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getImageUrl } from "../../utils/fileUtils";

function Input({type, placeholder, value, children, labelClass, inputClass, id, name, onChange, errors, touched, editing, focus, onBlur, removeFile, multiple, removeImages}) {
           const [readOnly, setReadOnly] = useState(true);
          const [outlineRing, setOutlineRing] = useState('focus:ring-green-500 focus:outline-green-500')
          const [Type, setType] = useState(type)
          

          const handlePassShowHide = () => {
            if(Type === 'password'){
              setType('text')
            }
            else{
              setType('password')
            }
          }

          useEffect(() => {
             if(touched && errors) {
            setOutlineRing(' ring-2 outline-2 ring-red-500 outline-red-500 ')
          }
          else{
            setOutlineRing(' focus:ring-2 focus:outline-2 focus:ring-green-500 focus:outline-green-500 ')
          }
          }, [value, errors, touched])
         
          console.log('input value', value)

  const handleEdit = () => {
    setReadOnly(false);
  }
return(<>
     {type === 'file' ? (<div className="flex flex-col items-start w-full">
    { value !== null && !Array.isArray(value) || Array.isArray(value) && value.length !== 0  ? Array.isArray(value) && value.length > 0 ? <div className="flex gap-6 bg-[#cadbd0] flex-wrap">{ value.map((file, index) => <div className="relative"><img key={index} className="w-30 h-30 object-cover self-center" src={file instanceof Blob ? URL.createObjectURL(file) : getImageUrl(file)}/><button type="button" onClick={() => { removeImages(index) }} className="absolute top-0 right-1 cursor-pointer"><Icon icon="material-symbols:cancel-outline-rounded" width="30px" height="30px"  style={{color: '#910a00'}} /></button></div>) } </div> : <div className="w-60 self-center relative"> <img className="w-60 object-cover self-center" src={value instanceof Blob ? URL.createObjectURL(value) : getImageUrl(value)} /><button onClick={removeFile} className="absolute top-0 right-1 cursor-pointer"><Icon icon="material-symbols:cancel-outline-rounded" width="30px" height="30px"  style={{color: '#910a00'}} /></button></div> :
    <>
    <div className="w-full py-9 bg-gray-200 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
<div className="grid gap-1">
<Icon className="mx-auto" icon="fa7-regular:file-text" width="40px" height="40px"  style={{color: 'oklch(45.3% 0.124 130.933)'}} />
<h2 className="text-center text-gray-400   text-xs leading-4">PNG, JPG or PNG, smaller than 15MB</h2>
</div>
<div className="grid gap-2">
<h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>
<div className="flex items-center justify-center">
<label>
  <input type="file" multiple={multiple} hidden name={name} onChange={onChange} accept="image/jpg, image/jpeg, image/png" />
  <div className="flex py-3 px-5 flex-col bg-green-800 rounded-[9px] shadow-sm text-white text-xs border border-secondary font-semibold leading-4 items-center justify-center cursor-pointer transition-all duration-700 hover:bg-white hover:text-green-800 hover:transition-all hover:duration-700 focus:outline-none">{children}</div>
</label>
</div>
</div>
</div>
    </>
    }
    {touched && errors ? (
              <div>{errors}</div>
            ) : null}
   </div>)
    : <div className="">
    <div className="flex flex-col items-start w-full relative">
    <input 
    id={id}
    type={Type} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
    name={name}
    onBlur={onBlur}
    readOnly={editing ? readOnly : false}
    className={"block autoFill px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent border border-gray-900 appearance-none focus:outline-none  peer h-14 rounded-[9px] pl-3 font-medium text-gray-700 " + outlineRing + " " + inputClass} 
    />
    {type === 'date' && <Icon className="absolute top-4 right-5" icon="uil:calender" width="30px" height="30px"  style={{color: 'oklch(45.3% 0.124 130.933)'}} />}
    {type === 'password' && <button type="button" onClick={handlePassShowHide}>{Type === 'password' ? <Icon className="absolute top-5 right-6" icon="mdi:show" width="20px" height="20px"  style={{color: 'oklch(45.3% 0.124 130.933)'}} /> : <Icon className="absolute top-5 right-6" icon="mdi:hide" width="20px" height="20px"  style={{color: 'oklch(45.3% 0.124 130.933)'}} />}</button>}

    <label className="inline-flex pointer-events-none items-center select-none cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5/6 peer-focus:translate-x-1 peer-focus:left-auto text-gray-900 font-semibold ml-2 " htmlFor={id}>{children}</label>
    {editing && readOnly && <button type="button" onClick={handleEdit}> <Icon className="absolute top-5 right-6" icon="iconamoon:edit" width="20px" height="20px"  style={{color: 'oklch(45.3% 0.124 130.933)'}} /></button>}
    </div>

    {touched && errors ? (
              <span className="text-red-500 text-[12px] self-start ml-3 -mt-5">* {errors}</span>
            ) : null}
    </div>
}
</>
)
};

export default Input;
