
const Task = require("../models/Task")
const Project = require("../models/Project")

const createTask = async(req,res)=>{
    try{
        const { title, description, status, priority, dueDate} =req.body

        const project = await Project.findOne({
            _id: req.params.projectId,
            owner: req.user,
        })

        if(!project){
            res.status(404).json({
                message: "project not found"
            })
        }

        const task = await Task.create({
             title,
             description,
             status,
             priority,
             project: project._id,
             owner: req.user,
             dueDate,
        })

        res.status(201).json({
            message: "Task createed successfully",
            task,
        })
    } catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}

const getTask = async( req, res) => {
    try{
        const project = await Project.findOne({
            _id: req.params.projectId,
            owner : req.user,
        })

        if(!project){
            return res.status(404).json({
                message: "project not found",
            })
        }

        const task = await Task.find({
                project: req.params.projectId,
                owner: req.user,
        }).sort({createdAt: -1})

        res.status(200).json(task)
    } catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message,
        })
    }
}

const updateTask = async(req, res) =>{
    try{
        const {title, description, status, priority, dueDate} = req.body;

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user,
            
        })

        if(!task){
            return res.status(404).json({
                message: "task nt found"
            })

        }

        task.title = title ?? task.title,
        task.description = description ?? task.description,
        task.status = status ?? tassk.status,
        task.priority = priority ?? task.priority,
        task.dueDate = dueDate ?? task.dueDate,

        await task.save()

        res.status(200).json({
            message: "task update successfully",
            task,
        })
    } catch (error){
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}

const deleteTask = async(req, res) => {
    try{
        const task = await Task.findByIdAndDelete({
            _id: req.params.id,
            qwner: req.user,
        })

        if(!task){
            return res.status(404)({
                message:"task not found"
            })
        }

        res.status(200).json({
            message: "task deleted successfully"
        })

    } catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask,
}