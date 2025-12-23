import express from 'express'
import { editAccessories, listAccessories } from '../controllers/accessories.js'

const router = express.Router()

// endpoint http://www.localhost:3000/api/accessories
router.get('/api/accessories',listAccessories)
router.post('/api/editAccessories' , editAccessories)

export default router