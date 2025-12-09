import expreess from 'express'
import { editEmployee, listEmployee } from '../controllers/employee.js'

const router = expreess.Router()

//endpoint http://localhost:3000/api/employee

router.get('/listEmployee' , listEmployee)
router.post('/editEmployee' , editEmployee)

export default router