import React from "react";

function FormButton({children, formik, className, editing}) {
return(
        <button className={`bg-green-800 text-xl md:text-3xl font-serif px-10 py-2 text-white border-secondary border rounded-[9px] self-center mt-2 transition-all duration-700 hover:bg-white hover:text-green-800 hover:duration-700 hover:transition-all disabled:opacity-70 disabled:text-[#666666] disabled:bg-[#cccccc] disabled:cursor-not-allowed ${className}`} type='submit' disabled={!(formik.isValid && formik.dirty)}>{children}</button>)
};

export default FormButton;
