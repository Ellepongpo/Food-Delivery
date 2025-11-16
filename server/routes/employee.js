import expreess from 'express'
import { editEmployee, listEmployee } from '../controllers/employee.js'

const router = expreess.Router()

router.post('/listEmployee' , listEmployee)
router.post('/editEmployee' , editEmployee)

export default router