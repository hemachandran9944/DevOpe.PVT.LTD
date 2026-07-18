const nodemailer = require('nodemailer');
const users = require('../Madules/user');





const isMailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD,
    },
    ConnectionTimedout: 10000,
    greegreetingTimeout: 10000 
});



isMailer.verify((error, success)=>{
    if (error) {
        console.log('Email Connetion error', error)
    } else {
        console.log('Email server is ready to send  message!', success);
    }
});




const welComeEmail = async (Name, Gmail, Otp) => {
    try {
        const mailOPtions = {
            from: `"DevOps PVT LTD" <${process.env.EMAIL}>`,
            to: Gmail,
            subject: 'Welcome to DevOps PVT LTD - Account Successfully Created',
            text: `Dear ${Name}\n\n`+
                  'Welcome to the DevOps PVT LTD family!\n\n'+
                  'We are excited to have you on board. Your account has been successfully created and is now ready to use.\n\n'+
                  'You can now log in to our dashboard to access our services and manage your profile.\n\n'+
                  `User Account: ${Gmail}\n` +
                  `Verification Code: ${Otp}\n\n` +
                  `Please note that this code is strictly confidential and will remain valid for the next 10 minutes only. For your security, do not share this OTP with anyone.\n\n` +
                  'If you have any questions or need assistance, feel free to reply to this email or visit our support page.\n\n'+
                  'Thank you for choosing us to power your DevOps PVT LTD journey.\n\n'+
                  'Best Regards\n\n'+
                  'The DevOps PVT LTD Team'
        }
        return await isMailer.sendMail(mailOPtions);
    } catch (error) {
        console.log('Welcome email sending failed:', error);
    }
}

module.exports = {welComeEmail};