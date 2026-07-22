const express = require('express');
const routes = express.Router();
const {validateJWTToken} = require('../Setting/Autho');
const {upload} = require('../Config/MulterFile');
const FileController = require('../Controllers/FileUplodeController')

routes.post('/resume-uplode', validateJWTToken,upload.single('UserResume'), FileController.UserFileCreat);

routes.get('/getsingleUser-resume/:id', validateJWTToken, FileController.GetSigleUserResume);
routes.get('/getAllUser-resume', FileController.GetAllUserResume);

routes.put('/updateUser-resume/:id', validateJWTToken, upload.single('UserResume'), FileController.updateuserResume);

routes.delete('/deleteSigle-userResume/:id', validateJWTToken, FileController.deleteSigleUser);
routes.delete('/deleteall-userResume', FileController.deleteAllUser);


module.exports = routes;