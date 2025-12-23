import express from 'express'
import { addAddress, addDefaultAddress, defaultAddress, editAddress, listAddress } from '../controllers/address.js'

const router = express.Router()

//endpoint http://localhost:3000/api/address
router.get('/api/address', listAddress)
router.post('/api/addAddress', addAddress)
router.post('/api/editAddress' , editAddress)

router.post('/api/addDefaultAddress', addDefaultAddress)
router.get('/api/defaultAddress' , defaultAddress)

export default router