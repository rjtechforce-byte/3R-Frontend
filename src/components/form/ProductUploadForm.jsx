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
import { FaBackward } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function ProductUploadForm({ showAlert }) {
  const navigate = useNavigate();
  const [focus, setFocus] = useState();

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
      return postProduct(data)
        .then((responseData) => {
          console.log('Response data after submission', responseData);
          showAlert("Product Uploaded Successfully", "not-error", "uploadProduct");
          navigate('/yourSchool');
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
      <div className="bg-[#D9E4DD]  min-h-screen w-full items-center flex-col flex justify-center py-15 overflow-auto px-10">
        <Form onSubmit={formik.handleSubmit}>
          <h1 className="text-3xl font-bold self-start text-green-800 mb-6 border-b border-gray-300 w-full bg-[#D9E4DD] py-4 pl-8">
            Upload Product Your Product
          </h1>
          <div
            className="bg-[#D9E4DD]
     inline-flex 
     w-screen
     flex-col
     md:w-[500px]
     lg:w-[600px]
     gap-6
     items-center
     px-8"
          >
            <Input
              type="file"
              multiple={false}
              touched={formik.touched.thumbnail}
              errors={formik.errors.thumbnail}
              id="thumbnail"
              name="thumbnail"
              value={formik.values.thumbnail}
              onChange={handleFileChange}
            >
              Upload Thumbnail
            </Input>
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
            >
              Title
            </Input>
            <DropDown
              inputClass="border border-white text-white"
              name="category"
              label="Product Category"
              useFor="form"
              touched={formik.touched.category}
              errors={formik.errors.category}
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <option
                disabled
                className=" disabled:text-gray-200 bg-green-900"
                value="category"
              >
                Select Product Category
              </option>
              <option className="bg-green-900" value="Electronics">
                Electronics
              </option>
              <option className="bg-green-900" value="Books">
                Books
              </option>
              <option className="bg-green-900" value="Clothing">
                Clothing
              </option>
              <option className="bg-green-900" value="Sports Equipment">
                Sports Equipment
              </option>
              <option className="bg-green-900" value="Art Supplies">
                Art Supplies
              </option>
              <option className="bg-green-900" value="Laboratory Equipment">
                Laboratory Equipment
              </option>
              <option className="bg-green-900" value="Stationery">
                Stationery
              </option>
              <option className="bg-green-900" value="Footwear">
                Footwear
              </option>
              <option className="bg-green-900" value="Bag">
                Bag
              </option>
              <option className="bg-green-900" value="Other">
                Other
              </option>
            </DropDown>
            <DropDown
              inputClass="border border-white text-white "
              name="condition"
              label="Condition"
              useFor="form"
              touched={formik.touched.condition}
              errors={formik.errors.condition}
              value={formik.values.condition}
              onChange={formik.handleChange}
            >
              <option
                disabled
                className=" disabled:text-gray-200 bg-green-900"
                value="condition"
              >
                Product Condition
              </option>
              <option className="bg-green-900" value="good">
                Good
              </option>
              <option className="bg-green-900" value="avarage">
                Avarage
              </option>
              <option className="bg-green-900" value="nice">
                Nice
              </option>
            </DropDown>
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
            >
              Upload Additional Images
            </Input>
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
            >Donor Name</Input>
            <DropDown
              inputClass="border border-white text-white "
              name="donorClass"
              label="Donor Class"
              useFor="form"
              touched={formik.touched.donorClass}
              errors={formik.errors.donorClass}
              value={formik.values.donorClass}
              onChange={formik.handleChange}
            >
              <option
                disabled
                className=" disabled:text-gray-200 bg-green-900"
                value="default"
              >
                In Which Class Donor Study?
              </option>
              <option className="bg-green-900" value="1">
                1
              </option>
              <option className="bg-green-900" value="2">
                2
              </option>
              <option className="bg-green-900" value="3">
                3
              </option>
              <option className="bg-green-900" value="4">
                4
              </option>
              <option className="bg-green-900" value="5">
                5
              </option>
              <option className="bg-green-900" value="6">
                6
              </option>
              <option className="bg-green-900" value="7">
                7
              </option>
              <option className="bg-green-900" value="8">
                8
              </option>
              <option className="bg-green-900" value="9">
                9
              </option>
              <option className="bg-green-900" value="10">
                10
              </option>
              <option className="bg-green-900" value="11">
                11
              </option>
              <option className="bg-green-900" value="12">
                12
              </option>
              <option className="bg-green-900" value="12th pass">
                12th pass
              </option>
              <option className="bg-green-900" value="Don't Study in School">
                Don't Study in School
              </option>
            </DropDown>
            <Textarea
              touched={formik.touched.description}
              errors={formik.errors.description}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              Description
            </Textarea>
            <FormButton formik={formik}>{formik.isSubmitting ? "Uploading Product..." : "Upload Product"}</FormButton>
          </div>
        </Form>
            <a href="/yourSchool" className="bg-green-800 cursor-pointer text-white px-15 xl:mt-27 max-h-20 py-2 mt-7 border-2 shadow-xl border-white-800 max-w-fit inline-flex gap-2 font-semibold text-2xl md:text-4xl font-serif items-center transition-all duration-700 rounded-[9px] group hover:text-green-800 hover:bg-white"><FaBackward /> GO BACK </a>
      </div>
    </>
  );
}

export default ProductUploadForm;
