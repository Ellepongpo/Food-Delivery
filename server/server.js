//step 1 import express
import express from 'express'
import morgan from 'morgan';
import dotenv from 'dotenv'
import cors from 'cors'

//routes
import authRouter from './routes/auth.js'
import categoryRouter from './routes/category.js'
import accessoriesRouter from './routes/accessories.js'
import productRouter from './routes/product.js'
import addressRouter from './routes/address.js'
import orderRouter from './routes/order.js'
import customerRouter from './routes/customer.js'


dotenv.config();
const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.json()) // ไว้อ่านไฟล์ json ที่ส่งมาจาก forn-end
app.use(cors())

app.use("/uploads", express.static("uploads"));

//step 3 router
app.use('/api',authRouter)
app.use('/api',categoryRouter)
app.use('/api',accessoriesRouter)
app.use('/api',productRouter)
app.use('/api',addressRouter)
app.use('/api',orderRouter)
app.use('/api',customerRouter)



//stap 2 start server 
app.listen(3000 , ()=> console.log('Server is running on port 3000'))
