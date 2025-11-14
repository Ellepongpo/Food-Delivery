import express from 'express'
import { editCustomer } from '../controllers/customer.js'

const router = express.Router()

router.post('/editCustomer', editCustomer)

export default router