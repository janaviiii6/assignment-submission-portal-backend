const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        task: {
            type: String,
            required: true
        },
        admin: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending','accept','reject'],
            default: 'pending'
        },
    },
    { timestamps: true }
);

const Assignment = mongoose.model("assignment",assignmentSchema);

module.exports = Assignment;