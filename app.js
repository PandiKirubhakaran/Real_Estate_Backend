import { log } from 'console'
import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

const app=express()
app.use(express.json())
app.use(cookieParser());

app.use('/api/get',(req,res)=>{
    res.send('API Working');
})

app.use('/api/auth',authRouter)

app.listen(8800,()=>{console.log('Server is running');})