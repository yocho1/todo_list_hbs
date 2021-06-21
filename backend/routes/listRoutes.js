import express from 'express'
const router = express.Router()
import { addList, getLists, deleteList } from '../controllers/listController.js'

router.route('/add').post(addList)
router.route('/all').get(getLists)
router.route('/delete/:id').delete(deleteList)

export default router
