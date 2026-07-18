const education = require('../Madules/education');



exports.CreateUserEducation = async (req, res) => {
    try {
        const {UserId} = req.body;
        const exitingRecord = await education.findOne({where: {UserId}});
        if (exitingRecord) {
            return res.status(400).json({status: 'failed', message: 'Already created education record for this user'});
        }
        const createEducation = await education.create(req.body);
        return res.status(201).json({status: 'success', message: 'create user education record successfulley!', data: createEducation});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}



exports.GETUserEducation = async (req, res) => {
    try {
        const Education = await education.findOne({where: {id: req.params.id}});
        if (! Education) {
            return res.status(404).json({status: 'failed', message: 'No education records found'});
        }
        return res.status(200).json({status: 'success', message: 'get educatio record suucessfulley!', data: Education});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}


exports.GetAllUsers = async (req, res) => {
    try {
        const getAllUsers = await education.findAll({order: [['createdAt', 'DESC']]});
        if (getAllUsers.length === 0) {
            return res.status(404).json({status: 'faield', message: 'no edecation records'});
        }
        return res.status(200).json({status: 'success', message: 'Get all education records!', data: getAllUsers.length});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}


exports.UpdateEdactionRecords = async (req, res) => {
    try {
        const UpdateUser = await education.findOne({where: {id: req.params.id}});
        if (!UpdateUser) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        await UpdateUser.update(req.body);
        await UpdateUser.reload()
        return res.status(200).json({status: 'success', message: 'Update user education record successfully!', data: UpdateUser});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}



exports.DeleteSingelUser = async (req, res) => {
    try {
        const deleteSingeuser = await education.findOne({where: {id: req.params.id}});
        if (!deleteSingeuser) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        await deleteSingeuser.destroy();
        return res.status(200).json({status: 'success', message: ' user education record delete successfully!', data: deleteSingeuser});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}



exports.DeletAllUsers = async (req, res) => {
    try {
        const deletedCount = await education.destroy({where: {}});
        if (deletedCount ===0) {
            return res.status(404).json({status: 'failed', message: 'No records found to delete'});
        }
        return res.status(200).json({status: 'success', message: 'Delete user education all record successfully!', deleteCount: deletedCount});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}