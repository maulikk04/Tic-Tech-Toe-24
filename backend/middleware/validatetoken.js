const jwt = require('jsonwebtoken');
require('dotenv').config();

const validatetoken = (req, res, next) => {

    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]
    //console.log(`from validate ${token}`)
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(404).json({ "error": "Unauthorized user" });
            }
            else {
                req.user = decoded;
                next();
            }
        })
    }
    else {
        res.status(404).json({ "error": "Unauthorized user" });
    }

}

module.exports = validatetoken;