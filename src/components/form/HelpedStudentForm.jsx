import React from "react";
import Form from './Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';
import DropDown from './DropDown';
import FormButton from "./FormButton";
import { useParams } from "react-router-dom";
import { postAddHelpedStudent } from "./api";
import { FaUserGraduate } from "react-icons/fa";
import { BackButton } from "./MiniComp";


function HelpedStudentForm() {
    const {_id} = useParams();
   const validationSchema = Yup.object({
            helpedStudentName: Yup.string()
                .min(2, 'Must be 2 characters')
                .required('Required'),
            helpedStudentClass: Yup.string().oneOf(
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '12th pass', "Don't Study in School"],
                'Invalid class'
            )
                .required('Required'),
        })

    const formik = useFormik({
        initialValues: {
            helpedStudentName: '',
            helpedStudentClass: 'default',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            postAddHelpedStudent(_id, values)
            .then((response) => {
                console.log('Successfully submitted helped student', response);
            })
            .catch((error) => {
                console.error('Error submitting helped student', error);
            });
        },
    });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col sm:justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4 shadow-lg shadow-green-100/50 ring-4 ring-white">
            <FaUserGraduate className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Add Helped Student
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the details of the student who received help
        </p>
      </div>

      <div className="mt-8 w-full flex items-center justify-center flex-col mx-auto max-sm:px-8">
        
          <Form onSubmit={formik.handleSubmit} className="bg-white py-8 px-4 sm:rounded-2xl sm:px-10 border border-gray-100 border-t-4 border-t-green-500 w-full">
            <div className="w-full flex flex-col gap-8">
              <Input
                type="text"
                touched={formik.touched.helpedStudentName}
                errors={formik.errors.helpedStudentName}
                id="helpedStudentName"
                name="helpedStudentName"
                value={formik.values.helpedStudentName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
              >
                Student Name
              </Input>

              <DropDown
                name="helpedStudentClass"
                label="Student Class"
                useFor="form"
                touched={formik.touched.helpedStudentClass}
                errors={formik.errors.helpedStudentClass}
                value={formik.values.helpedStudentClass}
                onChange={formik.handleChange}
                inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
              >
                <option disabled value="default" className="text-gray-400">Select Class</option>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '12th pass', "Don't Study in School"].map((cls) => (
                  <option key={cls} value={cls} className="text-gray-900">{cls}</option>
                ))}
              </DropDown>

              <div className="pt-4 self-center">
                <FormButton formik={formik}>Submit Details</FormButton>
              </div>
            </div>
          </Form>
         <div className="text-center mt-6">
             <BackButton to="/yourSchool"/>
          </div>
      </div>
    </div>
  );
};

export default HelpedStudentForm;