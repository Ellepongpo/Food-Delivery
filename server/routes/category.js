import express from 'express'
import {addCategory,listCategory,editCategory,deleteCategory} from '../controllers/category.js'
import { upload } from '../upload.js'

const router = express.Router()

// endpoint http://www.localhost:3000/api/category
router.post('/addCategory', upload.single('category_image') , addCategory)
router.get('/category', listCategory)
router.post('/editCategory',editCategory)
router.delete('/category/:id', deleteCategory)


export default router