const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const classSchema = new Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: [true, 'Teacher ID is required']
    },
    courseName: {
        type: String,
        required: [true, 'Class name is required'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9\s]+$/.test(v); 
            },
            message: 'Class name should contain only letters and numbers'
        }
    },
    courseCode:{
        type:String
    },
    classCode:{
        type:String
    },
    strength: {
        type: Number,
        required: [true, 'Strength is required'],
        min: [1, 'Strength must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Strength must be an integer value'
        }
    },
    stream: {
        type: String,
        required: [true, 'Stream is required'],
        enum: ['Maths', 'Literature', 'Physics', 'IT', 'Commerce', 'Biology'], 
        message: 'Stream must be one of Maths, Literature, Physics, IT, Commerce, or Biology'
    },
    year: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1 hour'],
        validate: {
            validator: Number.isInteger,
            message: 'Duration must be an integer value'
        }
    },
    TA: {
        type: [String], 
        validate: {
            validator: function (v) {
                return v.every(ta => validator.isEmail(ta) || /^[0-9]+$/.test(ta)); // Validate as email or numeric
            },
            message: 'Each TA entry must be a valid email or numeric value'
        }
    },
    details: {
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return v ? validator.isLength(v, { min: 10 }) : true; 
            },
            message: 'Details must be at least 10 characters long'
        }
    }
});

const classModel = mongoose.model('class', classSchema);
module.exports = classModel;
