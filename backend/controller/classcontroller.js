const classmodel = require('../model/classmodel');

const generateClassCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let classCode = '';
    for (let i = 0; i < 6; i++) {
        classCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return classCode;
};

const createClass = async(req,res)=>{
    try {
        const teacherId = req.user._id;
        const {courseName,courseCode,strength,stream,year,TA,details} = req.body;
        const classCode = generateClassCode();

        const classData = new classmodel({
            teacherId,
            courseName,
            strength,
            stream,
            year,
            TA,
            details,
            classCode,
            courseCode
        })
        await classData.save();
        res.status(200).json({message: "Class created successfully", classId: classData._id , classCode: classData.classCode});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

const getAllClass = async (req,res)=>{
    try {
        const classes = await classmodel.find();
        res.status(200).json(classes);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

const getClassById = async (req,res)=>{
    try {
        const classId = req.params.id;
        const classData = await classmodel.findById(classId);
        if(!classData){
            return res.status(404).json({message: "Class not found"});
        }
        res.status(200).json(classData);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

module.exports = {createClass,getAllClass,getClassById};