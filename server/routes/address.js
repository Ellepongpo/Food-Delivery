import express from 'express'
import { addAddress, addDefaultAddress, defaultAddress, editAddress, listAddress } from '../controllers/address.js'

const router = express.Router()

//endpoint http://localhost:3000/api/address
router.get('/address', listAddress)
router.post('/addAddress', addAddress)
router.post('/editAddress' , editAddress)

router.post('/addDefaultAddress', addDefaultAddress)
router.get('/defaultAddress' , defaultAddress)

export default router