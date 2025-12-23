import express from 'express'
import { customerTopPerMonth, salePerDay } from '../controllers/summary.js'

const router = express.Router()

//endpoint http://localhost:3000/api/summary

router.get('/api/salePerDay' , salePerDay)
router.get('/api/customerTopPerMonth' , customerTopPerMonth)

export default router