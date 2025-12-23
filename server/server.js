//import express
import express from 'express'
import morgan from 'morgan';
//import dotenv from 'dotenv'
import cors from 'cors'

//routes
import authRouter from './routes/auth.js'
import categoryRouter from './routes/category.js'
import accessoriesRouter from './routes/accessories.js'
import productRouter from './routes/product.js'
import addressRouter from './routes/address.js'
import orderRouter from './routes/order.js'
import customerRouter from './routes/customer.js'
import employeeRouter from './routes/employee.js'
import summaryRouter from './routes/summary.js'


//dotenv.config();
const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use("/uploads", express.static("uploads"))

//router
app.use(authRouter)
app.use(categoryRouter)
app.use(accessoriesRouter)
app.use(productRouter)
app.use(addressRouter)
app.use(orderRouter)
app.use(customerRouter)
app.use(employeeRouter)
app.use(summaryRouter)



//start server 
app.listen(3000 , ()=> console.log('Server is running on port 3000'))
