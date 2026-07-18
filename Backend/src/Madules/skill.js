const {DataTypes}  = require('sequelize');
const {PostgrySQL} = require('../Config/PostgrySQL');


const skill = PostgrySQL.define('UserSkill', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'DevOps_users',
            key: 'id'
        }
    },
    SkillsName: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            maxFiveSkill(value){
                if (value.length > 5) {
                    throw new Error ('You can add maximum 5 skill only');
                }
            }
        }
    },
    ProficiencyLevel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    YearsOfExperience: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    Category: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {timestamps: true, tableName: 'user_skill'});


module.exports = skill;