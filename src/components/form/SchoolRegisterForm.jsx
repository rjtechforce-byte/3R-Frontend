import React from "react";
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
             showAlert(error.response.data.error ,"error", "signNot");
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

return(
  <>
  <Slidebar />
  <div className="bg-[#D9E4DD]  min-h-screen w-full flex justify-center items-center py-30 flex-col overflow-auto px-10">
    <h1 className="text-green-900 text-2xl font-serif font-semibold">⚠️Register only if you are incharge or teacher of your school else strict action will be taken⚠️</h1>
    <Form onSubmit={formik.handleSubmit}>
    <h1 className='text-xl font-bold self-start text-green-800 mb-6 border-b border-gray-300 w-full bg-[#D9E4DD] py-4 pl-8'>School Registration Form</h1>
    <div className="bg-[#D9E4DD]
     inline-flex 
     w-screen
     flex-col
     md:w-[500px]
     lg:w-[600px]
     gap-6
     items-center
     px-8">
    <Input type="file" multiple={false} touched={formik.touched.schoolImage} errors={formik.errors.schoolImage} id="schoolImage" name="schoolImage" value={formik.values.schoolImage} onChange={handleFileChange}>Upload School Photo</Input>
    <Input type="text" name="schoolName" placeholder=" " value={formik.values.schoolName} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolName} touched={formik.touched.schoolName}>School Name</Input>
    <Input type="email" name="schoolEmail" placeholder=" " value={formik.values.schoolEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolEmail} touched={formik.touched.schoolEmail}>School Email</Input>
    <DropDown name="subDistrict" inputClass="border border-white text-white" label="Sub-District" value={formik.values.subDistrict} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.subDistrict} touched={formik.touched.subDistrict}>
          <option  disabled className=" disabled:text-gray-200 bg-green-900" value="defualt">Seelect Your Sub-District</option>
          <option  className="bg-green-900"  value="sardarshahar">Sardarshahar</option>
          <option  className="bg-green-900"  value="rajgarh">Rajgarh</option>
          <option  className="bg-green-900"  value="churu">Churu</option>
          <option  className="bg-green-900"  value="bidasar">Bidasar</option>
          <option  className="bg-green-900"  value="taranagar">Taranagar</option>
          <option  className="bg-green-900"  value="sujangarh">Sujangarh</option>
          <option  className="bg-green-900"  value="ratangarh">Ratangarh</option>
    </DropDown>
    <Input type="tel" name="schoolPhone" placeholder=" " value={formik.values.schoolPhone} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolPhone} touched={formik.touched.schoolPhone}>School Phone Number</Input>
    <Input type="text" name="inchargeName" placeholder=" " value={formik.values.inchargeName} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.inchargeName} touched={formik.touched.inchargeName}>Incharge Name</Input>
    <Input type="text" name="address" placeholder=" " value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.address} touched={formik.touched.address}>School Address</Input>
    <Input type="tel" name="inchargePhone" placeholder=" " value={formik.values.inchargePhone} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.inchargePhone} touched={formik.touched.inchargePhone}>Incharge Phone Number</Input>
    <Input type="password" name="password" placeholder=" " value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.password} touched={formik.touched.password}>Password</Input>
    <Input type="password" name="confirmPassword" placeholder=" " value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.confirmPassword} touched={formik.touched.confirmPassword}>Confirm Password</Input>
    <FormButton formik={formik}>Register</FormButton>
    </div>
    <p className="text-xl text-green-800">Already registered? <a className="font-semibold hover:underline" href="/schoolLogin">Log in</a></p>
    </Form>
    <a href="/" className="bg-white cursor-pointer text-green-800 px-15 xl:mt-27 py-2 mt-7 border-2 shadow-xl border-white-800  inline-flex gap-2 font-semibold text-4xl font-serif items-center transition-all duration-700 rounded-[9px] group hover:text-white hover:bg-green-800"><FaBackward /> GO BACK </a>
  </div>
  </>
)
};

export default SchoolRegisterForm;