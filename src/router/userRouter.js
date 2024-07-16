import express from 'express'
import {
  changeEmail,
  changePassword,
  login,
  register,
} from '../controller/userController.js'
const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.put('/change-password', changePassword)
userRouter.put('/change-email', changeEmail)

export default userRouter
