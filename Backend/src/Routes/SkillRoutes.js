const express = require('express');
const routes = express.Router();

const SkillController = require('../Controllers/SkillController');
const {validateJWTToken} = require('../Setting/Autho');

routes.post('/create-skill', SkillController.CreateUserSkill);

routes.get('/getAll-Userskill', SkillController.GetAllSkill);
routes.get('/getUserskill/:id', validateJWTToken, SkillController.GetSigleUserSkill);

routes.put('/update-userSkill/:id', validateJWTToken, SkillController.UpdateUserSkill);

routes.delete('/delete-userSkill/:id', validateJWTToken, SkillController.DeleteSingleUserSkill);
routes.delete('/delete-Alluser-Skill', SkillController.deleteAllSkill);



module.exports = routes;