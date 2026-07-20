const {DataTypes}  = require('sequelize');
const {PostgrySQL} = require('../Config/PostgrySQL');

const fileUplode = PostgrySQL.define('ResumeUplode', {
    id: {
        type:DataTypes.INTEGER,
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
    UserResume: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {timestamps: true, tableName: 'user_Resume'});


module.exports = fileUplode;