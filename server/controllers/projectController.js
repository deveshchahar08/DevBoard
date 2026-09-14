
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

const getProjects = async (req, res) =>{
    try{
        const projects =await Project.find({
            owner: req.user,
        }).sort({createdAt: -1})

        res.status(200).json(projects)
    } catch(error) {
        res.status(500).json({
            message: "server error",
            error: error.message,
        })
    }
}

const getProjectById = async (req,res)=> {
    try{
        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user
        })

        if(!project) {
            return res.status(404).json({
                message: "project not found"
            })
        }

        res.status(200).json(project)
    } catch(error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}

const updateProject = async(req, res) => {
    try{
        const {title, description, status, dueDate} = req.body

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user,
        });

        if(!project){
            return res.status(404).json({
                message: "project not found "
            })
        }

        project.title = title ?? project.title;
        project.description = description ?? project.description;
        project.status = status ?? project.status;
        project.dueDate = dueDate ?? project.dueDate;

        await project.save();

        res.status(200).json({
            message: "project updated successfully",
            project,
        })
    } catch(error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
}

const deleteProject = async (req,res) => {
    try{
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            owner: req.user,
        })

        if(!project){
           return res.status(404).json({
                message: " project not found ",
            })
        }

        res.status(200).json({
            message: "project deleted successfully"
        })
    }catch (error){
        res.status(500).json({
            message: " server error",
            error: error.message
        })
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
}