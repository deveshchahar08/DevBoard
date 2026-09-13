
const Project = require("../models/Project")

const createProject = async(req, res) =>{
    try{
        const{title, description, status, dueDate } = req.body

        const project = await Project.create({
            title,
            description,
            status,
            dueDate,
            owner: req.user,
        });

        res.status(201).json({
            message: "project created successfully",
            project,
        })

    } catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message,
        })
    }
}

module.exports = {
    createProject,
}