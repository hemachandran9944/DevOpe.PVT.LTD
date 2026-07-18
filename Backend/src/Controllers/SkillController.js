const skill = require('../Madules/skill');

exports.CreateUserSkill = async (req, res) => {
    try {
        const {UserId} = req.body;
        const exiting = await skill.findOne({where: {UserId}});
        if (exiting) {
            return res.status(400).json({status: 'failed', message: 'Skill record already exists for this user. Please update instead.'});
        }
        const createSkill = await skill.create(req.body);
        return res.status(201).json({status: 'success', message: 'User skill record created successfully.', data: createSkill}); 
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message}); 
    }
}



exports.GetAllSkill = async (req, res) => {
    try {
        const getAllskill = await skill.findAll({order: [['createdAt', 'DESC']]});
        if (getAllskill.length===0) {
            return res.status(404).json({status: 'failed', message: 'no skill records'});
        }
        return res.status(200).json({status: 'success', message: 'get all user skill successfulley', data: getAllskill});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}




exports.GetSigleUserSkill = async (req, res) => {
    try {
        const getSigleuserskill = await skill.findOne({where: {id: req.params.id}});
        if (!getSigleuserskill) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        return res.status(200).json({status: 'success', message: 'get single user skill successfulley', data: getSigleuserskill});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}


exports.UpdateUserSkill = async (req, res) => {
    try {
        const UpdateUserSkill = await skill.findOne({where: {id: req.params.id}});
        if (!UpdateUserSkill) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        await UpdateUserSkill.update(req.body);; 
        await UpdateUserSkill.reload();
        return res.status(200).json({status: 'success', message: 'Update user skill successfulley', data: UpdateUserSkill}); 
    } catch (error) {
        return res.status(500).json({status: 'fialed', message: error.message});
    }
}


exports.DeleteSingleUserSkill = async (req, res) => {
    try {
        const deleteSingleSkill = await skill.findOne({where: {id: req.params.id}});
        if (!deleteSingleSkill) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        await deleteSingleSkill.destroy();
        return res.status(200).json({status: 'success', message: 'delete user skill successfulley', data: deleteSingleSkill}); 
    } catch (error) {
        return res.status(500).json({status: 'fialed', message: error.message});
    }
}




exports.deleteAllSkill = async (req, res) => {
    try {
        const deleteAllskillUser = await skill.destroy({where: {}});
        if (deleteAllskillUser === 0) {
            return res.status(404).json({status: 'failed', message: 'No records found to delete'});
        }
        return res.status(200).json({status: 'success', message: 'delete all user skill successfulley', deleteCount: deleteAllskillUser}); 
    } catch (error) {
        return res.status(500).json({status: 'fialed', message: error.message});
    }
}