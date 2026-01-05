import React from "react";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormButton from "../components/form/FormButton";




function EditSchoolDetail() {

    const inputFiled = [
        {
            name: "schoolName",
            type: "text",
            label: "School Name"
        },
        {
            name: "schoolEmail",
            type: "email",
            label: "School Email"
        },
        {
            name: "schoolPhone",
            type: "tel",
            label: "School Phone"
        },
        {
            name: "schoolAddress",
            type: "text",
            label: "School Address"
        },
        {
            name: "inchargeName",
            type: "text",
            label: "Incharge Name"
        },
        {
            name: "inchargePhone",
            type: "tel",
            label: "Incharge Phone"
        },
        {
            name: "schoolImage",
            type: "file",
            multiple: false,
            label: "Upload Image"
        }
    ];

    const validationSchema = Yup.object({
        schoolName: Yup.string().required("School name is required"),
        schoolEmail: Yup.string().email("Invalid email").required("Email is required"),
        schoolPhone: Yup.string().required("Phone number is required"),
        schoolAddress: Yup.string().required("Address is required"),
        inchargeName: Yup.string().required("Incharge name is required"),
        inchargePhone: Yup.string().required("Incharge phone number is required"),
        schoolImage: Yup.mixed().required("Image is required")
    })

    const formik = useFormik({
        initialValues: {
            schoolName: "",
            schoolEmail: "",
            schoolPhone: "",
            schoolAddress: "",
            inchargeName: "",
            inchargePhone: "",
            schoolImage: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
        })


return(<div className="bg-[#D9E4DD]  min-h-screen w-full flex justify-center items-center py-30 flex-col overflow-auto">
<Form>
<h1 className="text-3xl md:text-5xl text-center font-bold self-start text-green-800 mb-6 font-serif border-b-4 border-green-900 w-full bg-[#D9E4DD] py-4">Edit School Detail</h1>
<div className="bg-[#D9E4DD]
     inline-flex 
     w-full
     flex-col
     gap-6
     items-center
     px-8">
{inputFiled.map((filedName) => <Input type={filedName.type} key={filedName.name} name={filedName.name} onChange={formik.handleChange} value={formik.values[filedName.name]} onBlur={formik.handleBlur} touched={formik.touched[filedName.name]} error={formik.errors[filedName.name]} {...(filedName.type !== "file" ? {placeholder: " "} : {multiple: filedName.multiple})}>{filedName.label}</Input>)
}
<FormButton formik={formik}>{formik.isSubmitting ? "Verifying details..." : "Update"}</FormButton>
</div>
</Form>
</div>)
};

export default EditSchoolDetail;