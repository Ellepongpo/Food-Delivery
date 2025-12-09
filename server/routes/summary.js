import express from 'express'
import { customerTopPerMonth, salePerDay } from '../controllers/summary.js'

const router = express.Router()

//endpoint http://localhost:3000/api/summary

router.get('/salePerDay' , salePerDay)
router.get('/customerTopPerMonth' , customerTopPerMonth)

export default router