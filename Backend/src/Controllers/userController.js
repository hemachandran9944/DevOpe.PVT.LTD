const User = require('../Madules/user');
const {welComeEmail} = require('../Setting/OptSender');
const {genarateToekn} = require('../Setting/Autho');
const bcryptHash = require('bcrypt');


exports.UserRegister = async (req, res) => {
    try {
        const {Name, Gmail, Password}=req.body;
        const UserEmail = await User.findOne({where: {Gmail: Gmail}});
        if (UserEmail) {
            return res.status(400).json({status: 'failed', message: 'User already register!'});
        }

        const otpMake = Math.floor(100000 + Math.random() * 900000).toString();
        const timeSet = new Date(Date.now() + 10 * 60 * 1000);
        await welComeEmail(Name, Gmail, otpMake);

        const newUsers = await User.create({
            Name,
            Gmail,
            Password,
            Otp: otpMake,
            OTPExpiration: timeSet 
        });
        return res.status(201).json({
            status: 'success',
            message: 'OTP send your email!. Please check and verify',
            data: {
                Name: newUsers.Name,
                Gmail: newUsers.Gmail,
                Otp: newUsers.Otp,
            }
        });
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}







exports.OTPVerify = async (req, res) => {
    try {
        const {Gmail, Otp} = req.body;
        const exitUser = await User.findOne({where: {Gmail: Gmail}})
        if (!exitUser) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        if (exitUser.isVerified) {
            return res.status(400).json({status: 'failed', message: 'already verifaid'});
        }
        if (exitUser.Otp !== Otp) {
            return res.status(400).json({status: 'failed', message: 'Worng Otp'});
        }
        if (new Date ()> exitUser.OTPExpiration) {
            return res.status(400).json({status: 'failed', message: 'Otp Expired'});
        }
        const Verification = await exitUser.update({
            isVerified: true,
            Otp: null,
            OTPExpiration: null
        });
        return res.status(201).json({status: 'success', message: 'Opt verifaid. Now you can login'})
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
};





exports.UserLogin = async (req, res) => {
    try {
        const {Gmail, Password} = req.body;
        const login = await User.findOne({where: {Gmail: Gmail}});
        
        if (!login) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        if (!login.isVerified) {
            return res.status(401).json({status: 'failed', message: 'Please verify OTP frist'});
        }

        const isMatchPassword = await bcryptHash.compare(Password, login.Password);
        if (!isMatchPassword) {
            return res.status(401).json({status: 'failed', message: 'wrong password'})
        }
        const JsonWebToken = genarateToekn(login.allUsers || login.UserId || login.id);

        return res.status(200).json({status: 'success', message: 'login successfulley!', jwt: JsonWebToken});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
        console.log('error message', error.message);
    }
}





exports.getAllUserData = async (req, res) => {
    try {
        const getuserData = await User.findAll({attributes: {exclude: ['Password', 'Otp', 'OTPExpiration', 'isVerified']}, order: [['id', 'DESC']]});
        return res.status(200).json({status: 'success', message:'get all user data successfulley!', data: getuserData.length});
    } catch (error) {
        return res.status(500).json({status:'failed', message: error.message});
    }
}






exports.GetSingleUserData = async (req, res) => {
    try {
        const oneUser = await User.findOne({
            where: {id: req.params.id},
            attributes: {exclude: ['Password', 'Otp', 'OTPExpiration', 'isVerified']}
        });
        if (!oneUser) {
            return res.status(404).json({status: 'failed', message: 'user not found!'});
        }
        return res.status(200).json({status: 'success', message:'get single user data successfully!', data: oneUser});
    } catch (error) {
        return res.status(500).json({status:'failed', message: error.message});
    }
}





exports.UpdateUser = async (req, res) => {
    try {
        const {Name, Gmail, Password} = req.body;
        const UpdateUser = await User.findOne({where: {id: req.params.id}});
        if (!UpdateUser) {
            return res.status(404).json({status: 'failed', message:'user not found'});
        }
        await UpdateUser.update({
            Name: Name || UpdateUser.Name,
            Gmail: Gmail || UpdateUser.Gmail,
            Password: Password || UpdateUser.Password
        });
        await UpdateUser.reload();
        return res.status(200).json({
            status: 'success',
            message: 'Update successfully!',
            data: {
                Name: UpdateUser.Name,
                Gmail: UpdateUser.Gmail
            }
        })
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}





exports.DeleteSingleUser = async (req, res) => {
    try {
        const deleteUser = await User.findOne({where: {id: req.params.id}});
        if (!deleteUser) {
            return res.status(404).json({status: 'failed', message: 'user not found'});
        }
        return res.status(200).json({status: 'success', message: 'delete single user successfully'});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}


exports.DeleteAllUser = async (req, res) => {
    try {
        const deleteAlluser = await User.destroy({where: {}});
        return res.status(200).json({status: 'success', message: 'delete all data delete successfulley!', deleteCount: deleteAlluser});
    } catch (error) {
        return res.status(500).json({status: 'failed', message: error.message});
    }
}