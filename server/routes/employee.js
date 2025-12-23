import expreess from 'express'
import { editEmployee, listEmployee } from '../controllers/employee.js'

const router = expreess.Router()

//endpoint http://localhost:3000/api/employee

router.get('/api/listEmployee' , listEmployee)
router.post('/api/editEmployee' , editEmployee)

export default router