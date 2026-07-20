const { Uplode_UserResume } = require('../Config/MulterFile');
const fileUplode = require('../Madules/File');

exports.UserFileCreat = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({status: 'failed', message: 'No file Uplode'});
        }
        const {UserId} = req.body;
        const exiting = await fileUplode.findOne({where: {UserId: UserId}});
        if (exiting) {
            return res.status(400).json({status: 'failed', message: 'Already Uplode this user resume'});
        }
        const result = await Uplode_UserResume(req.file.path);

        const newFile = await fileUplode.create({UserId: UserId, UserResume: result.secure_url});
        res.status(201).json({status: 'success', message: 'Resume uploaded successfully!', data: newFile});
    } catch (error) {
        res.status(500).json({status: 'failed', message: error.message});
    }
} 