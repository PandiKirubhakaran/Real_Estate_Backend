import express from 'express'
import { verifyToken } from '../middleware/verifyToken'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller'

const router=express.Router()

router.get('/',verifyToken, getUsers)
router.get('/:id',verifyToken,getUser)
router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyToken,deleteUser)

export default router