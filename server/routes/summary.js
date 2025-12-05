import express from 'express'
import { salePerDay } from '../controllers/summary.js'

const router = express.Router()

//endpoint http://localhost:3000/api/summary

router.post('/salePerDay' , salePerDay)

export default router