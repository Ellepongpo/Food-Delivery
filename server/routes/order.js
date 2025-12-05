import express from 'express'
import { addOrder, listOrders ,getOrderById, orders, updateOrderStatus, requestedCancel} from '../controllers/order.js'

const router = express.Router()

//endpoint http://localhost:3000/api/order

//customer
router.post('/addOrder', addOrder)
router.post('/orders', listOrders)
router.get('/orders/:order_id', getOrderById)
router.post('/requestedCancel', requestedCancel)

//employee
router.post('/employee/orders' , orders)
router.post('/employee/updateOrderStatus' , updateOrderStatus)

export default router