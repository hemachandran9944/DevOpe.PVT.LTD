const {DataTypes}  = require('sequelize');
const {PostgrySQL} = require('../Config/PostgrySQL');

const education = PostgrySQL.define('Education', {
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
        },
    },
    InstitutionName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Degree: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FieldOfStudy: {
        type: DataTypes.STRING,
        allowNull:false
    },
    StartYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    EndYear: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    Grade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    IsCurrentlyStudying: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {timestamps: true, tableName: 'user_education'});


module.exports = education;