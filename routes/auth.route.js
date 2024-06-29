import express from 'express'
import { postLogin, postLogout, postRegister } from '../controllers/auth.controller.js'

const router=express.Router()

router.post('/register',postRegister)
router.post('/login',postLogin)
router.post('/logout',postLogout)

export default router