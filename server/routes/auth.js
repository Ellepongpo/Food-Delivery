import express from 'express'
import {signUp,login,logout,
        signUpEmployee, loginEmployee , logoutEmployee} from '../controllers/auth.js'

const router = express.Router()

//endpoint http://localhost:3000/api/auth

//customer
router.post('/signUp' , signUp)
router.post('/login', login)
router.post('/logout',logout)

//employee
router.post('/loginEmployee', loginEmployee)
router.post('/logoutEmployee', logoutEmployee)
router.post('/signUpEmployee', signUpEmployee)


export default router
