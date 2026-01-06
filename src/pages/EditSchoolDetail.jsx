import React, { useState, useEffect } from "react";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormButton from "../components/form/FormButton";
import Slidebar from "../components/Slidebar";
import { BackButton, ErrorPage, Loading } from "../components/form/MiniComp";
import DropDown from "../components/form/DropDown";
import { useNavigate, useParams } from "react-router-dom";
import { getSchoolById, putUpdateSchoolDetails } from "../components/form/api";




function EditSchoolDetail({setAlert}) {
    const navigation = useNavigate();
    const id = useParams().id;
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       getSchoolById(id).then((res) => {
        console.log('respone in editschool',res);
        setDetails(res)
        setLoading(false);
       }).catch((err) => {
        setError(err.message || err.data.message || err.response.data.message || err.response.data.error || err.response.statusText || err.response.error);
        setLoading(false);
        console.log(err);
       })
    },[])

    const validationSchema = Yup.object({
        schoolName: Yup.string().required("School name is required"),
        schoolEmail: Yup.string().email("Invalid email").required("Email is required"),
        schoolPhone: Yup.string().required("Phone number is required"),
        address: Yup.string().required("Address is required"),
        inchargeName: Yup.string().required("Incharge name is required"),
        inchargePhone: Yup.string().required("Incharge phone number is required"),
        schoolImage: Yup.mixed().required("Image is required"),
        subDistrict: Yup.string().required('Sub District Is Required'),

    })

    const formik = useFormik({
        initialValues: {
            schoolName: details?.schoolName || "",
            schoolEmail: details?.schoolEmail || "",
            schoolPhone: details?.schoolPhone ||"",
            address: details?.address || "",
            inchargeName: details?.inchargeName || "",
            inchargePhone: details?.inchargePhone || "",
            schoolImage: details?.schoolImage || null,
            subDistrict: details?.subDistrict || 'defualt',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const data = new FormData();
            data.append('schoolName', values.schoolName);
            data.append('schoolEmail', values.schoolEmail);
            data.append('schoolPhone', values.schoolPhone);
            data.append('address', values.address);
            data.append('inchargeName', values.inchargeName);
            data.append('inchargePhone', values.inchargePhone);
            data.append('schoolImage', values.schoolImage);
            data.append('subDistrict', values.subDistrict);
            putUpdateSchoolDetails(id, data).then((res) => {
                console.log(res);
                navigation('/yourSchool', { replace: true })
                setAlert('School Detail Updated Successfully', 'not-error', 'uploadProduct');
            })
        }
        })

   const handleFileChange = (event) => {
    formik.setFieldValue('schoolImage', event.currentTarget.files[0]);
  };

const removeFile = () => {
    formik.setFieldValue('schoolImage', null);
  };


        
  
        if(loading) {
          return <Loading message="loading details..."/>
        }
  
        if(error) {
          return <ErrorPage error={error}/>
        }

return(
    <>
      <Slidebar />
      <div className="bg-gray-100 min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl flex flex-col justify-center items-center">
          <div className="flex items-center justify-center flex-col">

          <Form onSubmit={formik.handleSubmit} className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full">
            <h1 className='text-3xl md:text-4xl text-center font-bold text-gray-800 mb-8 font-sans border-b-2 pb-4'>
              Edit School Detail
            </h1>
            
            <div className="grid sm:w-full grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <Input type="file" multiple={false} touched={formik.touched.schoolImage} errors={formik.errors.schoolImage} id="schoolImage" name="schoolImage" value={formik.values.schoolImage} removeFile={removeFile} onChange={handleFileChange}  inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Upload School Photo</Input>
              </div>
              
              <Input type="text" name="schoolName" placeholder=" " editing={true} value={formik.values.schoolName} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolName} touched={formik.touched.schoolName} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">School Name</Input>
              <Input type="email" name="schoolEmail" placeholder=" " editing={true} value={formik.values.schoolEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolEmail} touched={formik.touched.schoolEmail} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">School Email</Input>
              
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

              <Input type="tel" name="schoolPhone" placeholder=" " editing={true} value={formik.values.schoolPhone} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.schoolPhone} touched={formik.touched.schoolPhone} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">School Phone</Input>
              
              <Input type="text" name="inchargeName" placeholder=" " editing={true} value={formik.values.inchargeName} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.inchargeName} touched={formik.touched.inchargeName} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Incharge Name</Input>
              <Input type="tel" name="inchargePhone" placeholder=" " editing={true} value={formik.values.inchargePhone} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.inchargePhone} touched={formik.touched.inchargePhone} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Incharge Phone</Input>
              
              <div className="md:col-span-2">
                 <Input type="text" name="address" placeholder=" " editing={true} value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} errors={formik.errors.address} touched={formik.touched.address} inputClass="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2.5">Full School Address</Input>
              </div>
              
              <div className="md:col-span-2 mt-6">
                <FormButton formik={formik}>{formik.isSubmitting ? "Verifying details..." : "Update"}</FormButton>
              </div>
            </div>
          </Form>
          <BackButton className="mt-6" to={-1}/>
</div>
        </div>
      </div>
    </>
)
};

export default EditSchoolDetail;