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


const forgotPasswordEmail = async (Name, Gmail, Otp) => {
    try {
        const forGetOtpMail = {
            from: `"DevOps PVT LTD" <${process.env.EMAIL}>`,
            to: Gmail,
            subject: 'Password Reset Request - DevOps PVT LTD',
            text: `Dear ${Name}\n\n`+
                  'We received a request to reset the password associated with your account.\n\n'+
                  'Please use the verification code below to proceed with resetting your password.\n\n'+
                  `User Account: ${Gmail}\n` +
                  `Verification Code: ${Otp}\n\n` + 
                  `This code is valid for the next 10 minutes only. For your security, please do not share this code with anyone.\n\n` +
                  'If you did not request a password reset, please ignore this email or contact our support team immediately, as your account may be at risk.\n\n'+
                  'For any assistance, feel free to reply to this email or visit our support page.\n\n'+
                  'Best Regards\n\n'+
                  'The DevOps PVT LTD Team'
        }
        return await isMailer.sendMail(forGetOtpMail);
    } catch (error) {
        console.log('Forgot password email sending failed:', error);
    }
}

const AppleyGmail = async (Name, Gmail) => {
    try {
        const appleyEmail = {
            from: `"DevOps PVT LTD" <${process.env.EMAIL}>`,
            to: Gmail,
            subject: 'Thank You for Applying - DevOps PVT LTD',
            text: `Dear ${Name},\n\n`+
                'Thank you for taking the time to apply to DevOps PVT LTD. We truly appreciate your interest in joining our team.\n\n'+
                'Our HR team has received your application and will carefully review your profile against the requirements of the role. Should your qualifications align with what we are looking for, a member of our team will reach out to you to discuss the next steps.\n\n'+
                'We understand that the wait can be uncertain, and we assure you that every application is given the attention it deserves.\n\n'+
                'Thank you once again for considering DevOps PVT LTD as your next career opportunity. We wish you the very best.\n\n'+
                'Warm Regards,\n'+
                'The DevOps PVT LTD Recruitment Team'
        }
        return await isMailer.sendMail(appleyEmail);
    } catch (error) {
        console.log('Application email sending failed:', error);
    }
}

module.exports = { welComeEmail, forgotPasswordEmail, AppleyGmail };