import express from 'express'
import { addOrder, listOrders ,getOrderById, orders, updateOrderStatus, requestedCancel} from '../controllers/order.js'

const router = express.Router()

//endpoint http://localhost:3000/api/order

//customer
router.post('/api/addOrder', addOrder)
router.post('/api/orders', listOrders)
router.get('/api/orders/:order_id', getOrderById)
router.post('/api/requestedCancel', requestedCancel)

//employee
router.post('/api/employee/orders' , orders)
router.post('/api/employee/updateOrderStatus' , updateOrderStatus)

export default router