const jwt = require('jsonwebtoken');

const genarateToekn = (UserId) => {
    try {
        const seceratjwt = process.env.JsonWebToken;
        if (!seceratjwt) {
            throw new Error ('JWT API key missing.env!');
        }
        return jwt.sign(
            {id: UserId},
            seceratjwt,
            {expiresIn: '1d'}
        )
    } catch (error) {
        console.log('Json Web token error', error.message);
        throw error;
    }
};








const validateJWTToken = (req, res, next)=>{
    try {
        const authoHeader = req.headers.authorization;
        if (!authoHeader || !authoHeader.startsWith('Bearer ')) {
            return res.status(401).json({status: 'failed', message: 'Token missing or invalid'});
        }
        const token  = authoHeader.split(' ')[1];
        const decode = jwt.verify(token, process.env.JsonWebToken);
        req.allUsers = decode;
        return next();
    } catch (error) {
        return res.status(401).json({status: 'Failed', message: error.message});
    }
};



module.exports = {genarateToekn, validateJWTToken};