const express = require('express');
const productRoute = express.Router();
const productController = require('../controllers/productController');


productRoute.post('/product', productController.postProduct);
productRoute.get('/allProducts', productController.getAllProducts);
productRoute.get('/category', productController.getProductsByCategory);
productRoute.get('/product/:id', productController.getProduct);
productRoute.get('/school/:schoolId/products', productController.getSchoolProducts)
productRoute.get('/product/search', productController.getProductSearch);
productRoute.put('/product/:id', productController.postEditProduct);
productRoute.post('/product/:id/helpedStudent', productController.postAddHelpedStudent);
module.exports = productRoute;
