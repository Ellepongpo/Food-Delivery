import express from 'express'
import { listAccessories } from '../controllers/accessories.js'

const router = express.Router()

// endpoint http://www.localhost:3000/api/accessories
router.get('/accessories',listAccessories)

export default router