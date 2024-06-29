import express from 'express'
import { verifyToken } from '../middleware/verifyToken';
import { shouldBeAdmin, shouldBeLoggedIn } from '../controllers/test.controller.js';

const router=express.Router()

router.post('/register',verifyToken,shouldBeLoggedIn)
router.post('/login',shouldBeAdmin)

export default router;