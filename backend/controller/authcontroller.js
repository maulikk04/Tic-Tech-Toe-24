const usermodel = require('../model/usermodel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const passport = require('passport');
const Token = require('../model/tokenmodel');
const bcrypt = require('bcrypt');

const errorhandel = (err) => {
    if(err.errors === NULL)
        return err.message;
    let error_message = '';
    Object.values(err.errors).forEach(({ properties }) => {
        error_message = properties.message
    })
    return error_message;
}

const signup_post = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, institute } = req.body;
        const user = await usermodel.findOne({ email: email });
        
        if (user) {
            return res.status(409).json({ message: "User already exists" })
        }
        if (password !== confirmPassword) {
            return res.status(401).json({ message: "Password not matching" })
        }

        const newUser = new usermodel({
            name: name,
            email: email,
            password: password,
            institute: institute
        })
        await newUser.save();
        res.status(200).json({ message: "User created successfully", userId: newUser._id })

    } catch (error) {
        const error_message = errorhandel(error);
        res.status(401).json({ message: error_message });
    }

}

const login_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await usermodel.findOne({ email: email })
        if (!data) {
            return res.status(401).json({ message: "Enter Valid Email" });
        }
        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
            console.log(1)
            return res.status(401).json({ message: "Enter valid password" });
        }
        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        })
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({ message: "User logged in successfully", userId: data._id, token: token })
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: error.message });
    }

}

const sendresetpasswordmail = async (name, email, token) => {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            requireTLS: true,
            auth: {
                user: process.env.email,
                pass: process.env.password
            }
        });

        const mailOptions = {
            from: process.env.email,
            to: email,
            subject: 'For reset password',
            html: '<p>Hii, ' + name + ', Plesae copy the link and <a href="http://localhost:4000/auth/reset-password?token=' + token + '"> reset your password </a>'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(`email send successfully ${info.response}`);
            }
        })
    } catch (err) {
        console.log(err);
        const error_message = errorhandel(err);
        res.status(401).json({ message: error_message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userdata = await usermodel.findOne({ email: email });

        if (!userdata) {
            return res.status(401).send({ message: "Enter valid registered Email Id" });
        }

        let tokendata = await Token.findOne({ userid: userdata._id });
        if (!tokendata) {
            const rs = randomstring.generate();
            tokendata = new Token({
                userid: userdata._id,
                token: rs
            });
            await tokendata.save();
        }

        sendresetpasswordmail(userdata.name, userdata.email, tokendata.token);
        return res.status(200).send({ message: "Reset Password Link has been sent to your email" })

    } catch (error) {
        console.log(error);
        const error_message = errorhandel(error);
        res.status(401).json({ message: error_message });    }

}

const resetPassword = async (req, res) => {
    try {
        const token = req.query.token;
        const tokendata = await Token.findOne({ token: token });
        if (tokendata) {
            const password = req.body.password;
            if (!password) {
                return res.status(401).send({ message: "Password is required" });
            }
            const user = await usermodel.findOne({ _id: tokendata.userid });
            if (!user) {
                return res.status(400).send({ message: "Cannot find user" });
            }
            user.password = password;
            await user.save();
            await tokendata.deleteOne({ token: token })
            return res.status(200).send({ message: "Password changed successfully" });
        }
        else {
            return res.status(404).send({ message: "Invalid Token" });
        }

    } catch (error) {
        console.log(error);
        const error_message = errorhandel(error);
        res.status(401).json({ message: error_message });    }
}




module.exports = { signup_post, login_post , forgotPassword, resetPassword };
