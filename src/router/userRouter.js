import express from 'express'
import {
  changeEmail,
  changePassword,
  login,
  register,
} from '../controller/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.put('/change-password', authMiddleware, changePassword)
userRouter.put('/change-email', authMiddleware, changeEmail)

export default userRouter
