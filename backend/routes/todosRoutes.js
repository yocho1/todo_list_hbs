import express from 'express'
const router = express.Router()
import {
  getTodos,
  addTodos,
  deleteTodo,
} from '../controllers/todoController.js'

router.route('/all').get(getTodos)
router.route('/add').post(addTodos)
router.route('/delete/:id').delete(deleteTodo)

export default router
