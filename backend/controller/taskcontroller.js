const task = require('../model/taskmodel');

const createTask = async (req,res)=>{
    try {
        const {title,start,end} = req.body;
        const task = new task({title, start, end});
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(401).json({message: error.message});
    }
}

const getAllTasks = async(req,res)=>{
    try {
        const tasks = await task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(401).json({message: error.message});
    }
}

module.exports = {createTask, getAllTasks}