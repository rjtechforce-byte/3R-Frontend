import React, { useEffect, useState } from 'react';
import Input from './Input';
import DropDown from './DropDown';
import { Icon } from '@iconify/react';
import Form from './Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postProduct, getProductById, postEditProduct } from './api';
import Textarea from './Textarea';
import FormButton from './FormButton';
import { useParams } from 'react-router-dom';


function ProductEdit({ showAlert }) {
   const [detail, setDetail] = useState({});
   const { _id } = useParams()
  console.log('detail', detail, detail.availability);
  

          const validationSchema = Yup.object({
            thumbnail: Yup.mixed().required('Image is required'),
            title: Yup.string().required('Title is required'),
            condition: Yup.string()
              .oneOf(['good', 'avarage', 'nice'], 'Select a valid condition')
              .required('Condition is required'),
            description: Yup.string().required('Description is required'),
            availability: Yup.string().required('Availability is required'),
            images: Yup.array().test( 'fileOrStringArray',
          'At least one image is required',
          value =>
            Array.isArray(value) &&
            value.length > 0 &&
            value.every(
        v => v instanceof File || v instanceof Blob || typeof v === 'string'
      )).min(1, 'At least one image is required'),
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


      
      const validCategories = ['Electronics', 'Books', 'Clothing', 'Sports Equipment', 'Art Supplies', 'Laboratory Equipment', 'Stationery', 'Footwear', 'Bag', 'Other'];
      
      const mapCategoryToNew = (oldCategory) => {
        if (validCategories.includes(oldCategory)) {
          return oldCategory;
        }
        
        const categoryMap = {
          'Furniture': 'Other',
          'footwear': 'Footwear',
          'Clothes': 'Clothing',
          'clothes': 'Clothing',
          'Stationary': 'Stationery',
          'bag': 'Bag',
        };
        
        return categoryMap[oldCategory] || 'Other'; 
      };

      const formik = useFormik({
        initialValues: {
          thumbnail: detail.thumbnail || null,
          title: detail.title || '',
          category: mapCategoryToNew(detail.category) || 'Other',
          condition: detail.condition || '',
          images: detail.images || [],
          donorName: detail.donorName || '',
          donorClass: detail.donorClass || '',
          availability: detail.availability !== undefined && detail.availability !== null ? String(detail.availability) : '',
          description: detail.description || '',
        },
         enableReinitialize: true,
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
          data.append('availability', values.availability);
          const promise = postEditProduct(_id, data);
          promise
            .then((responseData) => {
              getProductById(_id).then((product) => {
                setDetail(product);
                formik.resetForm({ values: {
                  thumbnail: product.thumbnail || null,
                  title: product.title || '',
                  category: product.category || '',
                  condition: product.condition || '',
                  images: product.images || [],
                  donorName: product.donorName || '',
                  donorClass: product.donorClass || '',
                  availability: product.availability !== undefined && product.availability !== null ? String(product.availability) : '',
                  description: product.description || '',
                }});
              });
            })
            .catch((error) => {
              console.error('Error during submission', error);
              window.scrollTo({
                top:0,
                behavior: 'smooth'
              })
              showAlert(error.response.statusText, "error")
            });
          console.log('Form data', data, values.title);
        },
      });

      useEffect(() => {
        getProductById(_id).then((product) => {
          setDetail(product);
        })
      }, []);


  const handleFileChange = (event) => {
    formik.setFieldValue('thumbnail', event.currentTarget.files[0]);
  };

const removeFile = () => {
    formik.setFieldValue('thumbnail', null);
  };

  const handleImagesChange = (event) => {
  const files = Array.from(event.currentTarget.files);
  // Keep existing string URLs, add new files
  const existingImages = formik.values.images.filter(img => typeof img === "string");
  formik.setFieldValue('images', [...existingImages, ...files]);
  };

  const removeImages = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue('images', updatedImages);
  };



return( <div className="bg-[#D9E4DD]  min-h-screen w-screen flex justify-center py-15 overflow-auto px-10">
        <Form onSubmit={formik.handleSubmit}>
          <h1 className="text-3xl font-bold self-start text-green-800 mb-6 border-b border-gray-300 w-full bg-[#D9E4DD] py-4 pl-8">
            Edit Product
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
              removeFile={removeFile}
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
                 editing={true}
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
                editing={true}
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
            <DropDown label="Availability"
              inputClass="border border-white text-white "
              name="availability"
              useFor="form"
              touched={formik.touched.availability}
              errors={formik.errors.availability}
              value={formik.values.availability}
              onChange={formik.handleChange}
            >
             <option className="bg-green-900" value="1">
                available
             </option>
 <option className="bg-green-900" value="0">
                unavailable
              </option>
            </DropDown>
            <Textarea
                touched={formik.touched.description}
                errors={formik.errors.description}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                  editing={true}
            >
              Description
            </Textarea>
            <FormButton editing={true} formik={formik}>Update Product</FormButton>
            </div>
            </Form>
</div>)
};

export default ProductEdit;