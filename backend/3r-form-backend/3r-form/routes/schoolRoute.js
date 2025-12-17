const express = require('express');
const schoolRoute = express.Router();
const schoolController = require('../controllers/schoolController');


schoolRoute.post('/register', schoolController.postSchoolRegister);
schoolRoute.post('/login', schoolController.postSchoolLogin);
schoolRoute.get('/current', schoolController.getCurrentSchool);
schoolRoute.get('/allSchool', schoolController.getAllSchool);
schoolRoute.get('/detail/:schoolId', schoolController.getSchoolById);
schoolRoute.get('/subDistrict/school', schoolController.getSchoolBySubDistrict);
schoolRoute.get('/schoolLeaderBoard', schoolController.getSchoolLeaderBoard)
module.exports = schoolRoute;