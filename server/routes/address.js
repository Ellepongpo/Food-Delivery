import express from 'express'
import { addAddress, addDefaultAddress, defaultAddress, editAddress, listAddress } from '../controllers/address.js'

const router = express.Router()

router.post('/addAddress', addAddress)
router.post('/address', listAddress)
router.post('/editAddress' , editAddress)

router.post('/addDefaultAddress', addDefaultAddress)
router.post('/defaultAddress' , defaultAddress)

export default router