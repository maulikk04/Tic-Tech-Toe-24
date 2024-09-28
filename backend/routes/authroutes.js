const express = require('express');
const router = express.Router();
const controller = require('../controller/authcontroller')
const passport = require('passport');
const jwt = require('jsonwebtoken')
const validateuser = require('../middleware/validatetoken')

router.post('/login' , controller.login_post);
router.post('/signup', controller.signup_post);
router.post('/forgot-password', controller.forgotPassword)
router.post('/reset-password/:token',controller.resetPassword)
router.get('/google', passport.authenticate('google', {
    scope: ['profile' , 'email']
}));
router.get('/google/redirect', passport.authenticate('google',{ failureRedirect: '/auth/failure' }),(req, res) => {
    const userid = req.user._id;
    res.redirect(`http://localhost:5173/dashboard`);
})

router.get('/failure', (req, res) => {
    res.redirect(`http://localhost:5173/auth/login?error=User Not Registered`);
});




module.exports = router;