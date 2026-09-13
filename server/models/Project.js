
const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: ["planning","active", "completed"],
            default: "planning",
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true
    }
)

const Project = mongoose.model("Project",projectSchema)

module.exports = Project