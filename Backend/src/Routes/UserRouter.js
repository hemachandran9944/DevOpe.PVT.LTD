const express = require('express');
const routes = express.Router();
const userControll = require('../Controllers/userController');
const {validateJWTToken} = require('../Setting/Autho');

const rateLimit = require ('express-rate-limit');

const AuthoLimit = rateLimit({
    windowMs: 15 * 60 *  1000,
    max: 10,
    message: {
        status: 'failed',
        message: 'Too Many Requests! Try after 15 minutes.'
    }
});

const generateLimit = rateLimit({
    windowMs: 20 * 60 * 1000,
    max: 15,
    message: {
        status: 'failed',
        message: 'Too Many Requests! Try after 20 minutes.'
    }
});

routes.post('/userRegister', AuthoLimit, userControll.UserRegister);
routes.post('/Opt-Verify', AuthoLimit, userControll.OTPVerify);
routes.post('/login', AuthoLimit, userControll.UserLogin);

routes.post('/forget-password-Opt', AuthoLimit, userControll.ResetPasswordOpt);
routes.post('/reset-password', AuthoLimit, userControll.ResetPassowrd);

routes.post('/logOut', userControll.LogOut);


routes.get('/get-Alluser', generateLimit, userControll.getAllUserData);
routes.get('/get-singleuser/:id', generateLimit, validateJWTToken, userControll.GetSingleUserData);


routes.put('/UpdateUser/:id', generateLimit, validateJWTToken, userControll.UpdateUser);


routes.delete('/delete-singleUser/:id', generateLimit, validateJWTToken, userControll.DeleteSingleUser);
routes.delete('/delete-allUser',  generateLimit, userControll.DeleteAllUser);

module.exports = routes;