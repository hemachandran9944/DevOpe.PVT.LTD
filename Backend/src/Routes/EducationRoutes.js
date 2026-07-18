const express = require('express');
const routes = express.Router();
const EducationControll = require('../Controllers/educationController');
const {validateJWTToken} = require('../Setting/Autho');


routes.post('/creat-education', EducationControll.CreateUserEducation);

routes.get('/singleUser-education/:id', validateJWTToken, EducationControll.GETUserEducation);
routes.get('/getAll-education', EducationControll.GetAllUsers);

routes.put('/update-userEducation/:id', validateJWTToken, EducationControll.UpdateEdactionRecords);

routes.delete('/delete-userEducation/:id', validateJWTToken, EducationControll.DeleteSingelUser);
routes.delete('/deleteAll-userEducation', EducationControll.DeletAllUsers);



module.exports = routes;