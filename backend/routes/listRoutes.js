import express from 'express'
const router = express.Router()
import { addList } from '../controllers/listController.js'

router.route('/add').post(addList)

export default router
