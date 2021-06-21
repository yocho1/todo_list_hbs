import express from 'express'
const router = express.Router()
import { addList, getLists } from '../controllers/listController.js'

router.route('/add').post(addList)
router.route('/all').post(getLists)

export default router
