import { useState } from 'react';
import Input from './Input';
import DropDown from './DropDown';
import { Icon } from '@iconify/react';
import Form from './Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postProduct } from './api';
import Textarea from './Textarea';
import FormButton from './FormButton';
import Slidebar from '../Slidebar';
import { BackButton } from './MiniComp';


function ProductUploadForm({ showAlert }) {
  

  const validationSchema = Yup.object({
    thumbnail: Yup.mixed().required('Image is required'),
    title: Yup.string().required('Title is required'),
    condition: Yup.string()
      .oneOf(['good', 'avarage', 'nice'], 'Select a valid condition')
      .required('Condition is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'At least one image is required'),
    donorName: Yup.string().required('Donor Name is required'),
    donorClass: Yup.string()
      .oneOf(
        [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '12th pass',
          "Don't Study in School",
        ],
        'Select a valid condition'
      )
      .required('Condition is required'),
    category: Yup.string()
      .oneOf(
        [
          'Electronics',
          'Books',
          'Clothing',
          'Sports Equipment',
          'Art Supplies',
          'Laboratory Equipment',
          'Stationery',
          'Footwear',
          'Bag',
          'Other',
        ],
        'Select a valid category'
      )
      .required('Category is required'),
  });

  const formik = useFormik({
    initialValues: {
      thumbnail: null,
      title: '',
      category: 'category',
      condition: 'condition',
      images: [],
      donorName: '',
      donorClass: 'default',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = new FormData();
      data.append('thumbnail', values.thumbnail);
      data.append('title', values.title);
      data.append('category', values.category);
      data.append('condition', values.condition);
      values.images.forEach(img => data.append('images', img));
      data.append('donorName', values.donorName);
      data.append('donorClass', values.donorClass);
      data.append('description', values.description);
      const promise = postProduct(data);
      promise
        .then((responseData) => {
          console.log('Response data after submission', responseData);
          showAlert("Product Uploaded Successfully", "not-error", "uploadProduct");
        })
        .catch((error) => {
          console.error('Error during submission', error);
          window.scrollTo({
            top:0,
            behavior: 'smooth'
          })
          showAlert(error.response.statusText
 , "error")
        });
      console.log('Form data', data, values.title);
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('thumbnail', event.currentTarget.files[0]);
  };

  const handleImagesChange = (event) => {
    formik.setFieldValue('images', Array.from(event.currentTarget.files));
  };

  const removeImages = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue('images', updatedImages);
  };

  console.log({ formik: formik.errors });

  return (
    <>
    <Slidebar />
      <div className="bg-gray-100 min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full flex items-center justify-center flex-col max-w-2xl">
      <Form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 border-b pb-4">
          Upload Your Product
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="md:col-span-2">
            <Input
              type="file"
              multiple={false}
              touched={formik.touched.thumbnail}
              errors={formik.errors.thumbnail}
              id="thumbnail"
              name="thumbnail"
              value={formik.values.thumbnail}
              onChange={handleFileChange}
              inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
            >
              Upload Thumbnail
            </Input>
          </div>
          
          <Input
            type="text"
            touched={formik.touched.title}
            errors={formik.errors.title}
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
          >
            Title
          </Input>
          
          <DropDown
            inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
            name="category"
            label="Product Category"
            useFor="form"
            touched={formik.touched.category}
            errors={formik.errors.category}
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option disabled value="category">Select Product Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Sports Equipment">Sports Equipment</option>
            <option value="Art Supplies">Art Supplies</option>
            <option value="Laboratory Equipment">Laboratory Equipment</option>
            <option value="Stationery">Stationery</option>
            <option value="Footwear">Footwear</option>
            <option value="Bag">Bag</option>
            <option value="Other">Other</option>
          </DropDown>
          
          <DropDown
            inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
            name="condition"
            label="Condition"
            useFor="form"
            touched={formik.touched.condition}
            errors={formik.errors.condition}
            value={formik.values.condition}
            onChange={formik.handleChange}
          >
            <option disabled value="condition">Product Condition</option>
            <option value="good">Good</option>
            <option value="avarage">Average</option>
            <option value="nice">Nice</option>
          </DropDown>
          
          <div className="md:col-span-2">
            <Input
              type="file"
              multiple={true}
              removeImages={removeImages}
              touched={formik.touched.images}
              errors={formik.errors.images}
              id="images"
              name="images"
              value={formik.values.images}
              onChange={handleImagesChange}
              inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
            >
              Upload Additional Images
            </Input>
          </div>
          
          <Input
            type="text"
            id="donorName"
            name="donorName"
            touched={formik.touched.donorName}
            errors={formik.errors.donorName}
            value={formik.values.donorName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder=" "
            inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
          >
            Donor Name
          </Input>
          
          <DropDown
            inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
            name="donorClass"
            label="Donor Class"
            useFor="form"
            touched={formik.touched.donorClass}
            errors={formik.errors.donorClass}
            value={formik.values.donorClass}
            onChange={formik.handleChange}
          >
            <option disabled value="default">In Which Class Donor Study?</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="12th pass">12th pass</option>
            <option value="Don't Study in School">Don't Study in School</option>
          </DropDown>
          
          <div className="md:col-span-2">
            <Textarea
              touched={formik.touched.description}
              errors={formik.errors.description}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputClass="w-full bg-gray-100 border border-gray-200 text-gray-800 text-base rounded-lg focus:ring-green-500 focus:border-green-500 p-4"
            >
              Description
            </Textarea>
          </div>
          
          <div className="md:col-span-2">
            <FormButton formik={formik} className="w-full text-base font-bold py-3">
              {formik.isSubmitting ? "Uploading..." : "Upload Product"}
            </FormButton>.
          </div>
        </div>
      </Form>
      <div className="text-center mt-6">
         <BackButton to="/yourSchool"/>
      </div>
    </div>
  </div>
    </>
  );
}

export default ProductUploadForm;
