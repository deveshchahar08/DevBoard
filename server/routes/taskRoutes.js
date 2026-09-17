
const express = require("express")

const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController")

const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/projects/:projectId/tasks", protect, createTask)
router.get("/projects/:projectId/tasks", protect, getTask)
router.put("/tasks/:id",protect, updateTask  )
router.delete("/tasks/:id", protect, deleteTask)

module.exports = router