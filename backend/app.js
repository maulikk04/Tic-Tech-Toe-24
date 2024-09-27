require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passportsetup = require('./middleware/passport_setup');
const uri = process.env.MONGO_URI;
const passport = require('passport')
const routes = require('./routes/authroutes')
const session = require('express-session');
const cors = require('cors');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(cors());
app.use(express.json()); 
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', routes)
app.get('/dashboard',(req,res)=>{
    res.json({json:"dashboard"});
})
mongoose.connect(uri)
    .then(() => {
        console.log('connected to database')
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err))