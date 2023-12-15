const mongoose = require('mongoose')


const todoSchema = mongoose.Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    }
    
})

module.exports.todoSchema = mongoose.model('Todo', todoSchema)