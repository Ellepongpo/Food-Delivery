import express from 'express'
import { addProduct,listProduct , searchProduct} from '../controllers/product.js'
import { upload } from '../upload.js'


const router = express.Router()

//endpoint http://localhost:3000/api/product

router.post('/addProduct',upload.single('product_image'), addProduct)
router.get('/product', listProduct)
router.get('/product/:id' , searchProduct)



export default router