import express from 'express'
import { postLogin, postLogout, postRegister } from '../controllers/auth.controller.js'

const authRouter=express.Router()

authRouter.post('/register',postRegister)
authRouter.post('/login',postLogin)
authRouter.post('/logout',postLogout)

export default authRouter