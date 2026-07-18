const express = require('express');
const routes = express.Router();
const userControll = require('../Controllers/userController');
const {validateJWTToken} = require('../Setting/Autho');

routes.post('/userRegister', userControll.UserRegister);
routes.post('/Opt-Verify', userControll.OTPVerify);
routes.post('/login', userControll.UserLogin);


routes.get('/get-Alluser', userControll.getAllUserData);
routes.get('/get-singleuser/:id', validateJWTToken, userControll.getAllUserData);


routes.put('/UpdateUser/:id', validateJWTToken, userControll.UpdateUser);


routes.delete('/delete-singleUser/:id', validateJWTToken, userControll.DeleteSingleUser);
routes.delete('/delete-allUser',  userControll.DeleteAllUser);

module.exports = routes;