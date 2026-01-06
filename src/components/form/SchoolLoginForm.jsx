import React, { useEffect } from "react";
import Form from "./Form";
import Input from "./Input";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import FormButton from "./FormButton";
import { postLoginSchool } from "./api";
import { useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import Slidebar from "../Slidebar";
import { BackButton } from "./MiniComp";

function SchoolLoginForm({ showAlert }) {
      const navigate = useNavigate()
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
          navigate('/yourSchool', { replace:true } )
          window.location.reload();

         }).catch((error) => {
          console.log('Login error:', error);
             showAlert(error?.response?.data.error || error.message,"error", "logNot");
             window.scrollTo({
            top:0,
            behavior: 'smooth'
            })
         })
        }
      });

      const token = localStorage.getItem('token');

      useEffect(() => {
        if (token) {
          navigate('/yourSchool', { replace: true });
        }
      }, [token, navigate]);

      if (token) return null;


return (
    <>
    <Slidebar />
      <div className="bg-gray-100 min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex items-center justify-center flex-col max-w-xl">
          <Form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-6 w-full">
            <h1 className='text-3xl text-center font-bold text-gray-800 font-sans'>
              School Login
            </h1>
            
            <div className="space-y-2 w-full">
              <Input 
                type="email" 
                name="schoolEmail" 
                placeholder=" " 
                value={formik.values.schoolEmail} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                errors={formik.errors.schoolEmail} 
                touched={formik.touched.schoolEmail}
                inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
              >
                School Email
              </Input>
              
              <Input 
                type="password" 
                name="password" 
                placeholder=" " 
                value={formik.values.password} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                errors={formik.errors.password} 
                touched={formik.touched.password}
                inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
              >
                Password
              </Input>
            </div>
            
            <div className="-mt-5">
              <FormButton formik={formik} className="w-full text-base font-bold py-3">
                {formik.isSubmitting ? "Verifying..." : "Login"}
              </FormButton>
            </div>

            <p className="text-sm text-center text-gray-600 pt-4">
              Don't have an account? <a className="font-medium text-green-600 hover:text-green-500 hover:underline" href="/schoolRegister">Register here</a>
            </p>
          </Form>
          <BackButton className="mt-6"/>
        
        </div>
      </div>
    </>
  )
};

export default SchoolLoginForm;
