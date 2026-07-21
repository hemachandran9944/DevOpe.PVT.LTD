const {DataTypes}  = require('sequelize');
const {PostgrySQL} = require('../Config/PostgrySQL');
const bcryptHash = require('bcrypt');


const users = PostgrySQL.define('UserResgister', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Gmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    OTPExpiration:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {timestamps: true, tableName: 'DevOps_users'});



// Create Hook
users.addHook('beforeCreate', async (user) => {
    try {
        user.Password = await bcryptHash.hash(user.Password, 10);
    } catch (error) {
        console.log('Password hasing error', error);
    }
})



// Update Hook
users.addHook('beforeUpdate', async (user) => {
    try {
        if (user.changed('Password')) {
            user.Password = await bcryptHash.hash(user.Password, 10);
        }
    } catch (error) {
        console.log('Password hasing error', error);
    }
})


module.exports = users;