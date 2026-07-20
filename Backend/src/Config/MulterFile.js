const multer = require('multer');
const cluodinary = require ('cloudinary').v2;

const fs = require('fs');
const path = require('path');



const uploder = path.join(__dirname, '../uploder')
if (!fs.existsSync(uploder)) {
    fs.mkdirSync(uploder);
    console.log('Uplode file creat');
}


cluodinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, uploder);
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});



const Uplode_UserResume = async (filepath) => {
    try {
        const result = await cluodinary.uploader.upload(filepath, {
            folder: 'User Resume',
            allowed_formats: ['pdf', 'doc', 'docx'],
            resource_type: 'raw'
        });
        fs.unlinkSync(filepath);
        return result;
    } catch (error) {
        console.log('User Resume Uplode Failed', error.message);
    }
}





module.exports = {upload, Uplode_UserResume};