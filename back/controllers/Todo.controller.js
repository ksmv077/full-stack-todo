const { Todo, todoSchema } = require('../models/Todo.model')


module.exports.todosController = {
    getTodo: async (req, res) => {
        try {
            const todo = await todoSchema.find({})
            res.json(todo)
        } catch (error) {
            res.json(error.message);
        }
    },


    addTodo: async (req, res) => {
        try {
            const todo = await todoSchema.create({title: req.body.title})
            res.json(todo)
        } catch (error) {
            console.log(error.message);
        }
    },

    deleteTodo: async (req, res) => {
        try {
            const todo = await todoSchema.findByIdAndDelete(req.params.id)
            res.json(todo)
        } catch (error) {
            console.log(error.message);
        }
    },
    patchTodo: async (req, res) => {
        try {
            const todo = await todoSchema.findByIdAndUpdate(req.params.id, {completed: req.body.completed}, {new: true})
            res.json(todo)
        } catch (error) {
            console.log(error.message);
        }
    }
}