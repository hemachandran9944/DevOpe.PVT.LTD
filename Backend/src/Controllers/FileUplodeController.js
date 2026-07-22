const { Uplode_UserResume } = require('../Config/MulterFile');
const {AppleyGmail} = require('../Setting/OptSender');
const fileUplode = require('../Madules/File');
const user = require('../Madules/user');



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

        const fetchedUser = await user.findOne({where: {id: UserId}});

        if (!fetchedUser) {
            return res.status(404).json({status: 'failed', message: 'User not found'});
        }

        const result = await Uplode_UserResume(req.file.path);
        const newFile = await fileUplode.create({UserId: UserId, UserResume: result.secure_url});
        await AppleyGmail(fetchedUser.Name, fetchedUser.Gmail);

        res.status(201).json({status: 'success', message: 'Resume uploaded successfully!', data: newFile});
    } catch (error) {
        res.status(500).json({status: 'failed', message: error.message});
    }
}


exports.GetAllUserResume = async (req, res) => {
    try {
        const getAllUserResume = await fileUplode.findAll({order: [['createdAt', 'DESC']]});
        if (getAllUserResume.length === 0) {
            return res.status(404).json({status: 'failed', message: 'no user resume found'});
        }
        return res.status(200).json({status: 'success', message: 'Get all user sucessfulley!', data: getAllUserResume});
    } catch (error) {
        res.status(500).json({status: 'failed', message: error.message});
    }
}


exports.GetSigleUserResume = async (req, res) => {
    try {
        const getSigleUserResume = await fileUplode.findOne({where: {id: req.params.id}});
        if (!getSigleUserResume) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        return res.status(200).json({status: 'success', message: 'get single user resume successfulley', data: getSigleUserResume});
    } catch (error) {
        res.status(500).json({status: 'failed', message: error.message});
    }
}




exports.updateuserResume = async (req, res) => {
    try {
        const existingResume = await fileUplode.findOne({where: {id: req.params.id}});
        if (!existingResume) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        if (!req.file) {
            return res.status(400).json({status: 'failed', message: 'no file uplode'});
        }
        const result = await Uplode_UserResume(req.file.path);
        await existingResume.update({UserResume: result.secure_url});
        
        await existingResume.reload();
        return res.status(200).json({status: 'success',message: 'user resume update successfully!', data: existingResume});
    } catch (error) {
        res.status(500).json({status: 'failed', message: error.message});
    }
}




exports.deleteSigleUser = async (req, res) => {
    try {
        const excited = await fileUplode.findOne({where: {id: req.params.id}});
        if (!excited) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        await excited.destroy();
        return res.status(200).json({status: 'success', message: 'delete sigle user resume successfulley'});
    } catch (error) {
        res.status(500).json({status: 'failed', message: error.message});
    }
}


exports.deleteAllUser = async (req, res) => {
    try {
        const excited = await fileUplode.destroy({where: {}});
        if (excited === 0) {
            return res.status(404).json({status: 'failed', message: 'No records found to delete'});
        }
        return res.status(200).json({status: 'success', message: 'delete all user resume successfulley', deleteUserCount: excited});
    } catch (error) {
        res.status(500).json({status: 'failed', message: error.message});
    }
}