const { Router } = require('express')
const { todosController } = require('../controllers/Todo.controller')

const router = Router()

router.get('/todo', todosController.getTodo)
router.post('/todo', todosController.addTodo)
router.delete('/todo/:id', todosController.deleteTodo)
router.patch('/todo/:id', todosController.patchTodo)


module.exports = router