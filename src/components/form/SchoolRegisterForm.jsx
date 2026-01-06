import React, { useEffect } from "react";
import Form from "./Form";
import Input from "./Input";
import Slidebar from "../Slidebar";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import FormButton from "./FormButton";
import { postRegisterSchool } from "./api";
import { useNavigate } from "react-router-dom";
import DropDown from './DropDown';
import { FaBackward } from "react-icons/fa";
import FormLiquidGlass from "./FormLiquidGlass";
import { BackButton } from "./MiniComp";
function SchoolRegisterForm({ showAlert }) {
      const navigation = useNavigate();


    const validationSchema = Yup.object({
        schoolImage:  Yup.mixed().required('Image is required'),
        schoolName: Yup.string().required('School Name is required'),
        inchargeName: Yup.string().required('Incharge Name is required'),
        schoolEmail: Yup.string().email('Invalid email format').required('School Email is required'),
        subDistrict: Yup.string().required('Sub District Is Required'),
        schoolPhone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('School Phone Number is required'),
        address: Yup.string().required('School Address is required'),
        inchargePhone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Incharge Phone Number is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      });

      const formik = useFormik({
        initialValues: {
          schoolImage: null,
          schoolName: '',
          schoolEmail: '',
          subDistrict: 'defualt',
          schoolPhone: '',
          address: '',
          inchargePhone: '',
          password: '',
          confirmPassword: '',
          inchargeName: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
          const formData = new FormData();
          formData.append('schoolImage', values.schoolImage)
          formData.append('schoolName', values.schoolName);
          formData.append('schoolEmail', values.schoolEmail);
          formData.append('schoolPhone', values.schoolPhone);
          formData.append('subDistrict', values.subDistrict);
          formData.append('address', values.address);
          formData.append('inchargePhone', values.inchargePhone);
          formData.append('password', values.password);
          formData.append('inchargeName', values.inchargeName);

          postRegisterSchool(formData).then(responseData => {
            console.log('Response data after submission', responseData);
            showAlert("Successfully signed", "not-error", "sign");
              window.scrollTo({
            top:0,
            behavior: 'smooth'
          })
            navigation(`/submittedSuccessfully/${Math.random().toString()}`, {state: {fromRegister: true}}, { replace: true })
          }).catch(error => {
            console.error('Error during submission', error);
             showAlert(error?.response?.data.error || error.message,"error", "signNot");
             window.scrollTo({
            top:0,
            behavior: 'smooth'
          })
          });
          console.log('Form data', values);
        }
      });

       const handleFileChange = (event) => {
        console.log('event',event.currentTarget.files[0] , formik.values)
        formik.setFieldValue('schoolImage', event.currentTarget.files[0]);
    };
console.log('values', formik.values)

const token = localStorage.getItem('token');

useEffect(() => {
  if (token) {
    navigation('/yourSchool', { replace: true });
  }
}, [token, navigation]);

if (token) return null;

return (
    <>
      <Slidebar />
      <div className="bg-gray-100 min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl flex flex-col justify-center items-center">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-8 shadow-sm">
            <p className="font-bold">Attention!</p>
            <p>Register only if you are incharge or teacher of your school else strict action will be taken⚠️</p>
          </div>
          <div className="flex items-center justify-center flex-col">

          <Form onSubmit={formik.handleSubmit} className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full">
            <h1 className='text-3xl md:text-4xl text-center font-bold text-gray-800 mb-8 font-sans border-b-2 pb-4'>
              School Registration
            </h1>
            
            <div className="grid sm:w-full grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <Input type="file" multiple={false} touched={formik.touched.schoolImage} errors={formik.errors.schoolImage} id="schoolImage" name="schoolImage" value={formik.values.schoolImage} onChange={handleFileChange} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Upload School Photo</Input>
              </div>
              
              <Input type="text" name="schoolName" placeholder=" " value={formik.values.schoolName} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolName} touched={formik.touched.schoolName} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">School Name</Input>
              <Input type="email" name="schoolEmail" placeholder=" " value={formik.values.schoolEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolEmail} touched={formik.touched.schoolEmail} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">School Email</Input>
              
              <DropDown name="subDistrict" inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5" label="Sub-District" value={formik.values.subDistrict} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.subDistrict} touched={formik.touched.subDistrict}>
                  <option disabled value="defualt">Select Your Sub-District</option>
                  <option value="sardarshahar">Sardarshahar</option>
                  <option value="rajgarh">Rajgarh</option>
                  <option value="churu">Churu</option>
                  <option value="bidasar">Bidasar</option>
                  <option value="taranagar">Taranagar</option>
                  <option value="sujangarh">Sujangarh</option>
                  <option value="ratangarh">Ratangarh</option>
              </DropDown>

              <Input type="tel" name="schoolPhone" placeholder=" " value={formik.values.schoolPhone} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolPhone} touched={formik.touched.schoolPhone} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">School Phone</Input>
              
              <Input type="text" name="inchargeName" placeholder=" " value={formik.values.inchargeName} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.inchargeName} touched={formik.touched.inchargeName} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Incharge Name</Input>
              <Input type="tel" name="inchargePhone" placeholder=" " value={formik.values.inchargePhone} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.inchargePhone} touched={formik.touched.inchargePhone} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Incharge Phone</Input>
              
              <div className="md:col-span-2">
                 <Input type="text" name="address" placeholder=" " value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.address} touched={formik.touched.address} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Full School Address</Input>
              </div>

              <Input type="password" name="password" placeholder=" " value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.password} touched={formik.touched.password} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Password</Input>
              <Input type="password" name="confirmPassword" placeholder=" " value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.confirmPassword} touched={formik.touched.confirmPassword} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Confirm Password</Input>
              
              <div className="md:col-span-2 mt-6">
                <FormButton formik={formik}>Create Account</FormButton>
              </div>
            </div>

            <p className="text-sm text-center text-gray-600 mt-8">
              Already have an account? <a className="font-medium text-green-600 hover:text-green-500 hover:underline" href="/schoolLogin">Log in here</a>
            </p>
          </Form>
          <BackButton className="mt-6"/>
</div>
        </div>
      </div>
    </>
  )
};

export default SchoolRegisterForm;
