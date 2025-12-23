import React, { useState, useEffect } from 'react';
import { getAllSchool, getSchoolProducts, deleteProduct } from '../components/form/api';
import Slidebar from '../components/Slidebar';
import { getThumbnailUrl } from '../utils/fileUtils';
import DropDown from '../components/form/DropDown';


const ManageProducts = ({ showAlert }) => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllSchool().then(setSchools);
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      setLoading(true);
      getSchoolProducts(selectedSchool)
        .then(setProducts)
        .finally(() => setLoading(false));
    } else {
      setProducts([]);
    }
  }, [selectedSchool]);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId)
        .then(() => {
          setProducts(products.filter((p) => p._id !== productId));
          showAlert('Product deleted successfully', 'success');
        })
        .catch(() => {
          showAlert('Failed to delete product', 'error');
        });
    }
  };

  return (
    <>
      <Slidebar />
      <div className={products.length === 0 ? "w-screen h-screen container mx-auto p-4" : "container mx-auto p-4"}>
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
        <div className="mb-4">
          <DropDown
            inputClass="border-gray-700 border text-black"
            labelClass="text-black bg-green-100 peer-focus:text-black peer-not-placeholder-shown:text-black"
            name="school-select"
            label={<span className='text-gray-700'>Select a school:</span>}
            id="school-select"
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="p-2 border rounded"
          >
            <option className='bg-green-600 text-gray-800' value="">--Please choose a school--</option>
            {schools.map((school) => (
              <option className='bg-green-600' key={school._id} value={school._id}>
                {school.schoolName}
              </option>
            ))}
          </DropDown>
        </div>

        {loading && <p>Loading products...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border bg-white rounded-lg shadow">
              <img src={getThumbnailUrl(product.thumbnail)} alt={product.title} className="w-full h-48 object-cover mb-2" />
              <div className='p-4'>
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p>{product.description}</p>
              <button
                onClick={() => handleDelete(product._id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageProducts;
