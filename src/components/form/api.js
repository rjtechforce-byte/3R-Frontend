import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['authorization'] = 'Bearer ' + localStorage.getItem('token');


export function postProduct(data) {
  return axios
    .post('https://rrr-frontend-1-3wn3.onrender.com/product', data, {
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
    .get('https://rrr-frontend-1-3wn3.onrender.com/allProducts')
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
    .get(`https://rrr-frontend-1-3wn3.onrender.com/product/${id}`)
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
    .post('https://rrr-frontend-1-3wn3.onrender.com/school/register', data)
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
    .post('https://rrr-frontend-1-3wn3.onrender.com/school/login', data, {
      withCredentials: true,
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

export function getCurrentSchool() {
  return axios
    .get('https://rrr-frontend-1-3wn3.onrender.com/school/current', {
      withCredentials: true,
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
    .get('https://rrr-frontend-1-3wn3.onrender.com/school/allSchool')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while getting all school', err);
    });
}

export function getSchoolProducts(id) {
  return axios
    .get(`https://rrr-frontend-1-3wn3.onrender.com/school/${id}/products`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('error while getting school products', err);
    });
}

export function getSchoolById(id) {
  return axios
    .get(`https://rrr-frontend-1-3wn3.onrender.com/school/detail/${id}`)
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
      `https://rrr-frontend-1-3wn3.onrender.com/school/subDistrict/school/?subDistrict=${subDistrict}`
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
    .get(
      `https://rrr-frontend-1-3wn3.onrender.com/school/schoolLeaderBoard`
    )
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
    .put(`https://rrr-frontend-1-3wn3.onrender.com/product/${id}`, data, {
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
    .get(`https://rrr-frontend-1-3wn3.onrender.com/product/search?q=${query}`)
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
    .post(`https://rrr-frontend-1-3wn3.onrender.com/product/${productId}/helpedStudent`, data, {
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
    .get(`https://rrr-frontend-1-3wn3.onrender.com/category?category=${category}`)
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
    .get(`https://rrr-frontend-1-3wn3.onrender.com/school/${schoolId}/helpedStudents/count`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error('Error while getting helped students count by school', err);
      throw err;
    });
}
