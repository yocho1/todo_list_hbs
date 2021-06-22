import express from 'express'
const router = express.Router()
import { addList, getLists, deleteList } from '../controllers/listController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/add').post(protect, addList)
router.route('/all').get(protect, getLists)
router.route('/delete/:id').delete(protect, deleteList)

export default router
