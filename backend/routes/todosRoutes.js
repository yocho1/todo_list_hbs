import express from 'express'
const router = express.Router()
import { getTodos, addTodos } from '../controllers/todoController.js'

router.route('/all').get(getTodos)
router.route('/add').post(addTodos)

export default router
