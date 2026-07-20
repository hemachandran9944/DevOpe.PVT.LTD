const express = require('express');
const routes = express.Router();
const {validateJWTToken} = require('../Setting/Autho');
const {upload} = require('../Config/MulterFile');
const FileController = require('../Controllers/FileUplodeController')

routes.post('/resume-uplode', validateJWTToken,upload.single('UserResume'), FileController.UserFileCreat);





module.exports = routes;