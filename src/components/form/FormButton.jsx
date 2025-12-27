import React from "react";

function FormButton({children, formik, className, editing}) {
return(
        <button className={`bg-green-800 text-lg px-6 py-2 text-white border-secondary border rounded-lg mt-2 transition-all duration-300 hover:bg-white hover:text-green-800 disabled:opacity-70 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`} type='submit' disabled={!(formik.isValid && formik.dirty)}>{children}</button>)
};

export default FormButton;
