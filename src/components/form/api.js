import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');

export const BASE_URL = 'https://rrr-backend-9ait.onrender.com';

export function postProduct(data) {
  return axios
    .post(`${BASE_URL}/product`, data, {
      headers: { 'Content-Type': 'multipart/form-data', 'authorization': 'Bearer ' + localStorage.getItem('token') },
    })
    .then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function getProducts() {
  return axios
    .get(`${BASE_URL}/allProducts`)
    .then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
    });
}

export function getProductById(id) {
  return axios
    .get(`${BASE_URL}/product/${id}`)
    .then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function postRegisterSchool(data) {
  return axios
    .post(`${BASE_URL}/school/register`, data)
    .then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function postLoginSchool(data) {
  return axios
    .post(`${BASE_URL}/school/login`, data, {
      withCredentials: true,
    })
    .then((response) => {
      console.log('API response', response.data);
      return response;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function getCurrentSchool() {
  return axios
    .get(`${BASE_URL}/school/current`, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function getAllSchool() {
  return axios
    .get(`${BASE_URL}/school/allSchool`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while getting all school', err);
    });
}

export function getSchoolProducts(id) {
  return axios
    .get(`${BASE_URL}/school/${id}/products`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while getting school products', err);
    });
}

export function getSchoolById(id) {
  return axios
    .get(`${BASE_URL}/school/detail/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while getting by school', err);
    });
}

export function getSchoolBySubDistrict(subDistrict) {
  return axios
    .get(
      `${BASE_URL}/school/subDistrict/school/?subDistrict=${subDistrict}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while getting by district school', err);
    });
}

export function getSchoolLeaderBoard() {
  return axios
    .get(`${BASE_URL}/school/schoolLeaderBoard`)
    .then((res) => {
      console.log('leaderboard data', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log('error while getting by district school', err);
    });
}

export function postEditProduct(id, data) {
  return axios
    .put(`${BASE_URL}/product/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function getProductSearch(query) {
  return axios
    .get(`${BASE_URL}/product/search?q=${query}`)
    .then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function postAddHelpedStudent(productId, data) {
  return axios
    .post(`${BASE_URL}/product/${productId}/helpedStudent`, data, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function getProductsByCategory(category) {
  return axios
    .get(`${BASE_URL}/category?category=${category}`)
    .then((response) => {
      console.log('API response - products by category', response.data);
      return response.data.products || response.data;
    })
    .catch((error) => {
      console.error('API error - products by category', error);
      throw error;
    });
}

export function getHelpedStudentsCountBySchool(schoolId) {
  return axios
    .get(`${BASE_URL}/school/${schoolId}/helpedStudents/count`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error('Error while getting helped students count by school', err);
      throw err;
    });
}


export function deleteProduct(id) {
  return axios
    .delete(`${BASE_URL}/product/delete/${id}`)
    .then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    });
}

export function getUnapprovedSchools() {
  return axios
    .get(`${BASE_URL}/school/unapproved`, {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while getting unapproved schools', err);
    });
}

export function approveSchool(id) {
  return axios
    .put(`${BASE_URL}/school/approve/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while approving school', err);
    });
}

export function deleteSchool(id) {
  return axios
    .delete(`${BASE_URL}/school/delete/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while deleting school', err);
    });
}


export function putUpdateSchoolDetails(id, data) {
  return axios
    .put(`${BASE_URL}/school/update/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      console.log('API response', response.data);
      return response.data;
    })
    .catch((error) => {
      console.error('API error', error);
      throw error;
    })
}



