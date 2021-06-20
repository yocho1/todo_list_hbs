import express from 'express'
const router = express.Router()
import { getTodos } from '../controllers/todoController.js'

router.route('/all').get(getTodos)

export default router
