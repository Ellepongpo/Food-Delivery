import express from 'express'
import {signUp,login,logout,
        signUpEmployee, loginEmployee , logoutEmployee} from '../controllers/auth.js'

const router = express.Router()

//endpoint http://localhost:3000/api/

//customer
router.post('/api/signUp' , signUp)
router.post('/api/login', login)
router.post('/api/logout',logout)

//employee
router.post('/api/loginEmployee', loginEmployee)
router.post('/api/logoutEmployee', logoutEmployee)
router.post('/api/signUpEmployee', signUpEmployee)


export default router
