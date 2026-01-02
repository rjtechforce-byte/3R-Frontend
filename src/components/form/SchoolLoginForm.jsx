import React, { useState } from "react";
import Form from "./Form";
import Input from "./Input";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import FormButton from "./FormButton";
import { postLoginSchool } from "./api";
import { useNavigate } from "react-router-dom";
import Slidebar from "../Slidebar";
import { FaBackward } from "react-icons/fa";
import { Loading } from "./MiniComp";


function SchoolLoginForm({ showAlert }) {
      const navigate = useNavigate()
      const [loading, setLoading] = useState(false);
     const validationSchema = Yup.object({
        schoolEmail: Yup.string().email('Invalid email format').required('School Email is required'),
        password: Yup.string().required('Password is required'),
      });

     const formik = useFormik({
        initialValues: {
          schoolEmail: '',
          password: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
          setLoading(true);
          console.log('Form data', values);
          const formData = new FormData();
          formData.append('schoolEmail', values.schoolEmail);
          formData.append('password', values.password);
          postLoginSchool(formData).then((res) => {
          console.log('Response data after submission', res );
          localStorage.setItem('token', JSON.stringify(res.data.token));
            showAlert("Successfully Login", "not-error", "Login");
              window.scrollTo({
            top:0,
            behavior: 'smooth'
          })
          setLoading(false);
          navigate('/yourSchool', { replace:true } );

         }).catch((error) => {
          console.log('Login error:', error);
          setLoading(false);
             showAlert(error?.response?.data.error || error.message,"error", "logNot");
             window.scrollTo({
            top:0,
            behavior: 'smooth'
            })
         })
        }
      });

if(loading) {
  return <Loading/>
}

return(
  <>
  <div className="bg-[#D9E4DD]  min-h-screen w-full flex justify-center flex-col items-center py-30 overflow-auto">
    <Form onSubmit={formik.handleSubmit} className="max-w-full h-130 md:min-w-[700px]">
    <h1 className='text-3xl md:text-5xl text-center font-bold self-start text-green-800 mb-6 font-serif border-b-4 border-green-900 w-full bg-[#D9E4DD] py-4'>School Login Form</h1>
    <div className="bg-[#D9E4DD]
     inline-flex 
     w-full
     flex-col
     gap-6
     items-center
     px-8">
    <Input type="email" name="schoolEmail" placeholder=" " value={formik.values.schoolEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolEmail} touched={formik.touched.schoolEmail}>School Email</Input>
    <Input type="password" name="password" placeholder=" " value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.password} touched={formik.touched.password}>Password</Input>
    <FormButton className=" mt-10" formik={formik}>{formik.isSubmitting ? "Verifying details..." : "Login"}</FormButton>
    </div>
    </Form>
    <a href="/" className="bg-green-800 cursor-pointer text-white px-15 xl:mt-27 max-h-20 py-2 mt-7 border-2 shadow-xl border-white-800  inline-flex gap-2 font-semibold text-2xl md:text-4xl font-serif items-center transition-all duration-700 rounded-[9px] group hover:text-green-800 hover:bg-white"><FaBackward /> GO BACK </a>
    </div>
  </>
)
};

export default SchoolLoginForm;
